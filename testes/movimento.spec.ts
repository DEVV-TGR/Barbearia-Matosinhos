import { test, expect, type Page } from "@playwright/test";

/* O movimento do site: loader entre páginas, deslize nas âncoras, painéis do
   preçário e secções a revelar-se.

   O que se verifica aqui não é "está animado" — é o que distingue uma animação
   de um corte: haver estados intermédios. Daí as medições a meio da transição,
   em vez de só no princípio e no fim. */

const visibilidadeDoLoader = (p: Page) =>
  p.locator("[data-carregamento]").evaluate((e) => getComputedStyle(e).visibility);

/**
 * Espera que o loader saia do caminho.
 *
 * Havia aqui uma espera fixa de 1400 ms — o mínimo do loader mais a entrada da
 * página. Chega com o servidor quente, onde o emblema se levanta aos 1250 ms,
 * mas não no primeiro pedido a um `next start` acabado de arrancar, onde a
 * hidratação demora o dobro. E enquanto o loader está de pé cobre o ecrã e come
 * os cliques, o que fazia falhar testes que nem sequer são sobre ele: o deslize
 * das âncoras dava um salto porque o clique nunca chegava à ligação.
 *
 * Esperar pelo estado em vez de pelo relógio mede o site e não a máquina.
 */
const esperarSite = async (p: Page) => {
  await expect.poll(() => visibilidadeDoLoader(p), {
    timeout: 15_000,
    message: "o loader não saiu do caminho"
  }).toBe("hidden");
};

test.describe("loader entre páginas", () => {
  test("cobre a primeira carga e sai do caminho", async ({ page }) => {
    await page.goto("/", { waitUntil: "commit" });
    await page.waitForTimeout(250);
    expect(await visibilidadeDoLoader(page)).toBe("visible");

    await esperarSite(page);
    expect(await visibilidadeDoLoader(page)).toBe("hidden");
  });

  test("levanta-se ao mudar de página", async ({ page }) => {
    await page.goto("/");
    await esperarSite(page);

    await page.getByRole("link", { name: "Marcar vez" }).first().click();
    await page.waitForTimeout(300);
    expect(await visibilidadeDoLoader(page)).toBe("visible");

    await expect(page).toHaveURL(/\/marcar/);
    await esperarSite(page);
    expect(await visibilidadeDoLoader(page)).toBe("hidden");
  });

  test("não se levanta para um salto dentro da mesma página", async ({ page }) => {
    await page.goto("/");
    await esperarSite(page);

    // O botão do hero, e não o do cabeçalho: em telemóvel esse está escondido
    // dentro do menu. De caminho cobre o `href` relativo, sem caminho nenhum.
    await page.getByRole("link", { name: "Ver preços" }).click();
    await page.waitForTimeout(300);
    expect(await visibilidadeDoLoader(page)).toBe("hidden");

    // E voltar atrás de uma âncora também não é mudar de página
    await page.goBack();
    await page.waitForTimeout(300);
    expect(await visibilidadeDoLoader(page)).toBe("hidden");
  });
});

test.describe("âncoras", () => {
  test("deslizam em vez de saltar", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await esperarSite(page);
    expect(await page.evaluate(() => scrollY)).toBe(0);

    /* Amostrar em vez de espreitar num instante fixo. Um salto dá duas
       posições — zero e o destino; um deslize dá muitas pelo meio. Espreitar
       aos 120 ms dizia isso no Chromium mas não no WebKit, cujo deslize é
       bem mais curto: aos 120 ms já ia a 50 px do fim e o teste falhava por
       causa do motor, não por causa do site. */
    const amostragem = page.evaluate(() => new Promise<number[]>((resolve) => {
      const vistas: number[] = [];
      const t = setInterval(() => vistas.push(Math.round(scrollY)), 16);
      setTimeout(() => { clearInterval(t); resolve(vistas); }, 700);
    }));

    await page.locator("header").getByRole("link", { name: "Serviços", exact: true }).click();
    const vistas = await amostragem;

    await page.waitForTimeout(1200);
    const fim = await page.evaluate(() => scrollY);

    const peloMeio = [...new Set(vistas.filter((y) => y > 0 && y < fim - 5))];
    expect(peloMeio.length, `só ${peloMeio.length} posições intermédias: parece um salto`)
      .toBeGreaterThanOrEqual(2);

    expect(page.url()).toContain("#servicos");
    // O `scroll-margin-top` do tema tira o título de debaixo do cabeçalho fixo
    const topo = await page.locator("#servicos").evaluate((e) => e.getBoundingClientRect().top);
    expect(Math.abs(topo)).toBeLessThan(120);
  });

  test("no telemóvel o menu fecha no mesmo clique", async ({ page }) => {
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto("/");
    await esperarSite(page);

    await page.getByRole("button", { name: "Abrir menu" }).click();
    const menu = page.getByRole("dialog");
    await expect(menu).toBeVisible();

    // O deslize trava o `next/link` com `preventDefault`; se travasse o evento
    // todo, o menu ficava aberto por trás da página a deslizar.
    await menu.getByRole("link", { name: "Equipa" }).click();
    await expect(menu).toBeHidden();

    await page.waitForTimeout(1500);
    expect(await page.evaluate(() => scrollY)).toBeGreaterThan(0);
    expect(page.url()).toContain("#equipa");
  });
});

test.describe("painéis do preçário", () => {
  test("fecham por etapas, não de um golpe", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await esperarSite(page);
    await page.locator("#servicos").scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);

    /* O grupo mais longo do preçário, e não o primeiro: este teste mede o fecho
       de um painel alto, e o primeiro grupo tem só os dois packs. */
    const grupo = page.locator("#servicos .MuiAccordion-root")
      .filter({ hasText: "Extras & Cuidados" });
    const cabecalho = grupo.locator(".MuiAccordionSummary-root");
    const painel = grupo.locator(".MuiCollapse-root").first();

    await cabecalho.click();
    await expect(cabecalho).toHaveAttribute("aria-expanded", "true");

    /* Esperar que a altura *assente*, e não apenas que passe de 500: parar na
       primeira leitura acima do limiar apanhava o painel ainda a abrir, e o
       fecho seguinte partia de meia altura — o que fazia este teste medir uma
       animação que nunca chegou a existir. Duas leituras iguais seguidas é o
       sinal de que a abertura acabou. */
    let anterior = -1;
    await expect.poll(async () => {
      const h = Math.round((await painel.boundingBox())!.height);
      const assentou = h === anterior && h > 500;
      anterior = h;
      return assentou;
    }, { intervals: [150, 150, 150, 200, 200, 300], message: "o painel não assentou" }).toBe(true);

    const aberto = (await painel.boundingBox())!.height; // são nove serviços

    /* Amostrar o fecho em vez de espreitar uma vez a meio.
       Antes era um `waitForTimeout(180)` seguido de uma leitura: com a suite
       toda em paralelo, esses 180ms mais a ida e volta da medição caíam já
       depois dos 375ms que o painel demora a fechar, lia-se zero e o teste
       falhava sem que nada estivesse mal. O que se quer provar é que houve
       estados intermédios — então recolhem-se todos os que houver. */
    await grupo.locator(".MuiAccordionSummary-root").click();

    const alturas: number[] = [];
    const limite = Date.now() + 1500;
    while (Date.now() < limite) {
      const h = (await painel.boundingBox())?.height ?? 0;
      alturas.push(h);
      if (h === 0 && alturas.length > 1) break;
    }

    expect(alturas.at(-1), "o painel não chegou a fechar").toBe(0);

    /* Pelo menos uma leitura tem de o apanhar a meio caminho: com a curva de
       abertura, um painel deste tamanho já ia em 3 % ao fim de um terço do
       tempo, e lia-se como um estalo em vez de um fecho. */
    const aMeio = alturas.filter((h) => h > aberto * 0.15 && h < aberto * 0.85);
    expect(aMeio.length, `alturas lidas: ${alturas.map(Math.round).join(", ")}`)
      .toBeGreaterThan(0);
  });
});

test.describe("secções", () => {
  test("revelam-se ao chegar ao ecrã", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await esperarSite(page);

    /* Só as secções, e não tudo o que se revela: dentro da equipa cada retrato
       tem o seu `Revela` para entrarem em escada, e contá-los aqui era medir
       outra coisa. Filho directo de `[data-pagina]` é o que distingue uma
       secção da página de uma peça dentro dela. */
    const seccoes = page.locator("[data-pagina] > [data-revela]");
    // Oito desde que as avaliações passaram a ter textos verdadeiros
    await expect(seccoes).toHaveCount(8);

    // E os retratos da equipa, esses, revelam-se um a um
    await expect(page.locator("#equipa [data-revela]")).toHaveCount(4);

    const equipa = seccoes.nth(3);
    const opacidade = (l: typeof equipa) => l.evaluate((e) => Number(getComputedStyle(e).opacity));
    expect(await opacidade(equipa)).toBeLessThan(1);

    await equipa.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    expect(await opacidade(equipa)).toBe(1);
    expect(await equipa.evaluate((e) => getComputedStyle(e).transform)).toBe("none");

    const ultima = seccoes.nth(7);
    await ultima.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    expect(await opacidade(ultima)).toBe(1);
  });
});

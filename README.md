# Man Space | Male Concept — site de demonstração

Site demo para o [Man Space](https://www.instagram.com/manspace.pt/), barbearia
masculina em Matosinhos. Next.js, React e MUI.

> **Isto é uma demonstração.** Não é o site oficial da barbearia. As marcações
> ficam guardadas apenas no navegador de quem visita e não chegam à loja.

## Por confirmar

Está tudo em [`lib/dados.ts`](lib/dados.ts), assinalado com `POR CONFIRMAR`, e
o site sabe esconder o que estiver vazio — a linha da morada, o telefone, os
testemunhos e a secção de avaliações só aparecem quando tiverem conteúdo.

| O quê | Estado |
|---|---|
| Serviços, preços, durações | ✅ do AppBarber e do poster da loja |
| Equipa e retratos | ✅ |
| Tabela de preços | ✅ `public/img/tabela-precos.jpg` |
| Horário | ✅ Seg–Qui 10–19, Sex 9–19, Sáb 9–18 |
| Morada e código postal | ⚠️ lidos da ficha do Google Maps, por confirmar |
| Avaliações (261) | ✅ confirmado pelo cliente |
| Telefone | ⏳ vazio |
| Ano de abertura | ⏳ e com ele o código do painel |
| Textos das avaliações | ✅ cinco, copiadas do Google sem uma palavra mudada |
| Fotografias do espaço | ⏳ oito provisórias do Unsplash, com prefixo `tmp-` |

## Páginas

| Rota | O que é |
|---|---|
| `/` | Início — a casa, os packs, o preçário, a equipa, o ofício, contactos |
| `/marcar` | Assistente de marcações em quatro passos |
| `/painel` | Painel interno com a agenda dos barbeiros (código `2024`) |

## O que tem

- **Marcações funcionais**: serviço → barbeiro → dia e hora → dados.
- **Faixa de acção fixa**, preta, ao fundo do ecrã: sobe assim que há uma
  escolha, para não ser preciso rolar até ao fim para continuar.
- **As experiências abertas**: os dois packs mostram os nove e os sete serviços
  que incluem. No painel de marcações do cliente são duas linhas com um preço.
- **Marcar a partir de um serviço**: cada linha do preçário liga a
  `/marcar?servico=<id>`, que abre já com o serviço escolhido.
- **Guardar no calendário**: ficheiro `.ics` ou ligação para o Google Agenda.
- **Painel**: agenda por dia, filtro por barbeiro, resumo de ocupação e receita,
  e estados (agendada / concluída / faltou).
- **Menu de ecrã inteiro** no telemóvel: destinos em corpo grande, a entrar um
  a um, com o horário e a morada ao fundo.
- **Avaliações verdadeiras** copiadas da ficha do Google, sem uma palavra
  mudada, em `lib/dados.ts`.
- **Mapa do Google** na secção de contactos, com a ficha da casa. Usa
  `output=embed`, que não precisa de chave de API.
- **Molduras no lugar das fotografias que faltam**: mesmas medidas, com a
  legenda do que ali vai ficar. Quando as fotos chegarem muda-se `lib/dados.ts`
  e nenhum componente.
- **Três faixas pretas** — hero, packs e chamada final — contra o creme das
  restantes secções. É o preto das placas do poster, à largura toda.
- **Fotografias provisórias**: oito imagens do Unsplash, todas com o prefixo
  `tmp-` e inventariadas num só bloco em `lib/dados.ts` — o hero, a faixa do
  lema, "A Casa", a coluna do preçário e as quatro do ofício. A parede e a
  placa, essas, são recortes reais dos retratos da equipa.

## Arranque

```bash
npm install
npm run dev      # http://localhost:3000
```

## Como as marcações funcionam

O motor está em [`lib/marcacoes.ts`](lib/marcacoes.ts) e é a única porta de
acesso aos dados — nem o assistente nem o painel falam com o `localStorage`
directamente. Não tem uma linha de DOM nem de React: é lógica pura, e por isso
testável sem browser.

| Regra | Comportamento |
|---|---|
| Horário | Vem de `CASA.horario`. Os dias fechados não geram horas, e as frases sobre o dia de folga também saem daí. |
| Duração | A marcação tem de caber antes do fecho. Madeixas (165 min) só até às 17:15. |
| Sobreposição | Um barbeiro não pode ter duas marcações que se cruzem. |
| Sem preferência | Só oferece a hora se houver alguém livre; atribui ao confirmar. |
| Antecedência | Mínimo 30 minutos, máximo 60 dias. |
| Corrida | O slot é revalidado ao gravar; se foi ocupado entretanto, recusa. |

O calendário é o `DateCalendar` do MUI X, ligado a estas regras por
`shouldDisableDate`: o componente trata da mecânica e da acessibilidade, as
regras da casa continuam a mandar. As horas ocupadas aparecem riscadas em vez de
escondidas — é mais informativo do que fazer sumir metade da grelha.

### O que esta demonstração não faz

Não há servidor. As marcações vivem no `localStorage` do navegador de quem as
faz, por isso **um barbeiro que abra o painel no telemóvel dele não vê o que um
cliente marcou noutro dispositivo**. O painel tem um botão para carregar uma
agenda de exemplo, de modo a poder ser mostrado preenchido.

Pela mesma razão, o código de acesso ao painel (`2024`) está no código-fonte e
não é segurança — separa o painel do site público, nada mais.

## Testes

```bash
npm test           # 78 testes: motor de marcações e contraste da paleta
npm run test:e2e   # 48 testes × 2 motores (Chromium e WebKit/iPhone)
```

O `e2e` cobre o percurso completo de marcação, a ligação directa por serviço, a
faixa de acção, os grupos colapsáveis, o `.ics`, o painel com estados e filtros,
o menu de ecrã inteiro — e, em **sete resoluções dos 375px aos 2560px**, verifica
nada transborda e que **nenhum texto desce abaixo de 12px**. Esta última parte
existe porque a versão anterior tinha rótulos a 8.6px, ilegíveis no telemóvel.

Corre em **dois motores**: Chromium e WebKit em viewport de iPhone. O WebKit é o
motor do Safari, e foi lá que apareceram problemas que os testes só em Chromium
não apanhavam — cabeçalho translúcido a deixar ler o que passava por baixo,
cartões altos demais, selos cortados. Há um bloco de testes dedicado a isso.

Outro bloco trava a escala no telemóvel: a página inicial não pode passar de
10 500 px, nenhuma fotografia pode passar de 320 px de altura e nenhum botão pode
ficar abaixo dos 44 px de alvo de toque. A página chegou a ter 11 601 px — quase
14 ecrãs de scroll — porque cada fotografia ocupava 467 px numa coluna só.

## Estrutura

```
app/
  layout.tsx     providers, tema, cabeçalho, rodapé
  page.tsx       marcar/page.tsx   painel/page.tsx
  tema.ts        createTheme: MUI vestido à casa
  design.ts      fontes (next/font) + reexporta a paleta
components/      Cabecalho, Rodape e as peças de cada página
  Marca.tsx      o wordmark composto com letra, e a moldura de esquadria
  Moldura.tsx    uma fotografia, ou o lugar reservado dela
lib/
  dados.ts       serviços, preços, barbeiros, horário — e os tipos
  marcacoes.ts   motor: disponibilidade, conflitos, estados, ICS
  cores.ts       paleta e `comAlfa`, sem dependências (usada também nos testes)
  useMarcacoes.ts  ponte para o React, trata da hidratação
public/img/      retratos, placa, preçário, recortes da parede e `tmp-*`
testes/
```

## Sobre os dados

Há duas fontes e não coincidem. O painel de marcações da casa
([AppBarber](https://sites.appbarber.com.br/manspace-j56c)) diz o que é marcável
e quanto tempo demora; o poster de preços da loja dá os nomes da casa, as
descrições e o que vai dentro de cada pack. O AppBarber manda no que existe, o
poster manda no que se lê.

Onde divergem — "Corte Degrade" contra "Corte tradicional", uma prótese contra
três — está anotado em [`lib/dados.ts`](lib/dados.ts). As fotografias dos
barbeiros e o poster são da casa. Os papéis de cada barbeiro e os textos
descritivos foram escritos a partir do preçário e ainda não estão confirmados.

## Desenho

O sistema não foi inventado: está no poster de preços da loja. Creme `#F4EBDE`
por baixo, filete fino a separar, **etiqueta preta a anunciar cada bloco** e o
preço grande a bronze `#6B5028`. O site é a versão web desse impresso.

[Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) nos
títulos — a serifa de alto contraste mais próxima do wordmark — e
[Jost](https://fonts.google.com/specimen/Jost) no texto corrido, que em
maiúsculas muito espaçadas dá o "MALE CONCEPT" do logo. Ambas com `next/font`.

O wordmark é composto com letra, não servido como imagem: o logo que existe é a
fotografia de uma placa, que pesa, não escala e traz consigo o bege do estúdio.
Ver [`components/Marca.tsx`](components/Marca.tsx).

Sobre o papel das cores: numa paleta escura o dourado podia ser ao mesmo tempo
o ornamento e a cor dos botões. Sobre creme não pode — nenhum dourado que ainda
pareça dourado chega aos 4.5:1 que o texto exige. Por isso a cor de acção é o
preto da placa da parede e o bronze fica para preços, numerais e filetes, onde é
grande o suficiente para se ler. As vinte e duas combinações são medidas contra
o WCAG em `testes/contraste.test.ts`.

O tema em `app/tema.ts` desfaz o aspecto Material de origem: cantos a dois
pixéis em vez de catorze, sem elevação, e uma escala tipográfica com mínimo de
12px — incluindo o "MALE CONCEPT", que no impresso pode ser minúsculo e num ecrã
não.

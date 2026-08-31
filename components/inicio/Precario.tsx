"use client";

import { useState } from "react";
import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import BotaoLink from "../BotaoLink";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Envolve from "../Envolve";
import Sobrescrita from "../Sobrescrita";
import TituloSeccao from "../TituloSeccao";
import { SERVICOS, type Servico } from "@/lib/dados";
import { euros, duracao } from "@/lib/formatar";
import { cores, comAlfa, tituloFonte } from "@/app/design";
import { CURVA, TEMPO, escada, tempoPainel } from "@/lib/movimento";

/** Os grupos não mudam entre renders: calculados uma vez, fora do componente. */
const GRUPOS = [...new Set(SERVICOS.map((s) => s.grupo))];

function Seta() {
  return (
    <Box component="svg" viewBox="0 0 24 24" width={18} height={18} fill="none"
      stroke="currentColor" strokeWidth={2.5} aria-hidden sx={{ color: "primary.main" }}>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </Box>
  );
}

/**
 * Em ecrã largo é uma linha só. Em ecrã estreito são duas — nome em cima,
 * duração, preço e botão lado a lado em baixo — para não sobrar espaço morto
 * nem deixar o botão sozinho numa terceira linha.
 */
function Linha({ s, aberto, ordem }: { s: Servico; aberto: boolean; ordem: number }) {
  /* No poster o preço é o segundo elemento mais forte da linha, a seguir ao
     nome, e está a bronze. Os que são um mínimo levam "desde" à frente, em
     corpo pequeno, para o número continuar a ser o que se lê primeiro. */
  const etiquetaPreco = (
    <Typography sx={{
      fontFamily: tituloFonte.style.fontFamily, fontSize: "1.4rem",
      fontWeight: 500, color: cores.acento3,
      whiteSpace: "nowrap", lineHeight: 1, letterSpacing: "0.01em",
      // Vinte e cinco preços em coluna: sem isto os algarismos não alinham
      fontVariantNumeric: "tabular-nums"
    }}>
      {s.desde && (
        <Box component="span" sx={{
          fontSize: "0.62em", textTransform: "uppercase", letterSpacing: "0.16em",
          color: cores.texto3, mr: 0.7
        }}>
          desde
        </Box>
      )}
      {euros(s.preco)}
    </Typography>
  );

  return (
    <Box
      component="li"
      data-servico-linha
      sx={{
        p: { xs: 1.25, md: 2 }, bgcolor: "background.default",
        border: "1px solid transparent", borderRadius: 0,

        /* A abrir, as linhas sobem em escada, atrás do painel a crescer; a
           fechar caem todas ao mesmo tempo e depressa, senão a última ainda se
           via depois de o painel já ter encolhido. */
        opacity: aberto ? 1 : 0,
        transform: aberto ? "none" : "translate3d(0, 10px, 0)",
        transition: [
          `opacity ${aberto ? TEMPO.medio : TEMPO.micro}ms ${CURVA.entrada} ${aberto ? escada(ordem, 26, 10) : "0ms"}`,
          `transform ${aberto ? TEMPO.medio : TEMPO.micro}ms ${CURVA.entrada} ${aberto ? escada(ordem, 26, 10) : "0ms"}`,
          `border-color ${TEMPO.curto}ms ${CURVA.suave}`,
          `background-color ${TEMPO.curto}ms ${CURVA.suave}`
        ].join(", "),

        "&:hover": {
          borderColor: cores.fundo4,
          transform: { md: "translate3d(4px, 0, 0)" }
        },
        display: "grid",
        /* No telemóvel a linha tem duas alturas — nome e descrição em cima, o
           resto em baixo. Com 1.2 de intervalo o cartão passava dos 120px que o
           teste de escala impõe, e vinte e cinco cartões assim davam outro ecrã
           e meio de scroll. */
        gap: { xs: 1, md: 1.2 },
        gridTemplateColumns: { xs: "1fr", md: "1fr auto auto auto" },
        alignItems: { md: "center" },
        columnGap: { md: 2.5 }
      }}
    >
      <Box>
        <Typography sx={{
          fontFamily: tituloFonte.style.fontFamily, fontWeight: 500, fontSize: "1.15rem",
          textTransform: "uppercase", lineHeight: 1.15, letterSpacing: "0.04em"
        }}>
          {s.nome}
        </Typography>
        {/* A frase do poster. Sem ela, "método full barba" e "barbaterapia"
            são dois nomes que ninguém sabe distinguir. */}
        {s.descricao && (
          <Typography variant="body2" sx={{
            color: cores.texto3, mt: { xs: 0.25, md: 0.4 }, lineHeight: 1.4,
            fontSize: { xs: 14, md: 15 }
          }}>
            {s.descricao}
          </Typography>
        )}
      </Box>

      {/* Segunda linha em telemóvel; em ecrã largo dissolve-se na grelha */}
      <Box sx={{
        display: { xs: "flex", md: "contents" },
        alignItems: "center", justifyContent: "space-between", gap: 1.5
      }}>
        <Typography variant="overline" sx={{ color: cores.texto3, whiteSpace: "nowrap" }}>
          {duracao(s.minutos)}
        </Typography>

        <Box sx={{ display: { xs: "flex", md: "contents" }, alignItems: "center", gap: 2 }}>
          {etiquetaPreco}
          <BotaoLink
            href={`/marcar?servico=${encodeURIComponent(s.id)}`}
            variant="outlined"
            size="small"
            aria-label={`Marcar ${s.nome}`}
          >
            Marcar
          </BotaoLink>
        </Box>
      </Box>
    </Box>
  );
}

export default function Precario() {
  /* Controlado, e não `defaultExpanded`, porque as linhas precisam de saber se
     o grupo está aberto para entrarem em escada.

     Abre só o primeiro grupo. O preçário anterior tinha dezanove serviços
     num grupo único e abria inteiro, que era como se lia melhor; este tem
     vinte e cinco repartidos por cinco famílias, e aberto de uma vez faz
     4 424px no telemóvel — cinco ecrãs só de preços, com os nomes dos grupos a
     passar depressa demais para se verem. Fechado, o preçário mostra primeiro
     do que é que é feito. O estado inicial é calculado do mesmo modo no servidor e no
     cliente, para não haver um salto depois de hidratar. */
  const [fechados, setFechados] = useState<readonly string[]>(() => GRUPOS.slice(1));

  const alternar = (grupo: string) => (_e: React.SyntheticEvent, aAbrir: boolean) =>
    setFechados((anteriores) =>
      aAbrir ? anteriores.filter((g) => g !== grupo) : [...anteriores, grupo]
    );

  return (
    <Box component="section" id="servicos" sx={{ py: { xs: 5, md: 12 }, bgcolor: "background.paper" }}>
      {/* Duas colunas em ecrã largo. Este é o bloco mais alto da página e não
          tinha nada para ver: vinte e cinco linhas de texto a seguir a um
          título. A coluna da esquerda acompanha a lista enquanto ela rola, e
          leva a fotografia — assim há sempre alguma coisa no ecrã além de
          preços. No telemóvel volta a ser uma coluna só, como era. */}
      <Envolve sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "0.85fr 1.15fr" },
        gap: { xs: 0, md: 7 },
        alignItems: "start"
      }}>
        <Box sx={{
          // Um item de grelha tem `min-width: auto`: recusa encolher abaixo do
          // conteúdo. Com preços e durações em `nowrap` lá dentro, a coluna
          // exigia 363px e esticava a grelha para fora do ecrã a 375px.
          minWidth: 0,
          position: { md: "sticky" },
          /* 54px de cabeçalho mais folga — a mesma conta do `scrollMarginTop`
             do tema. A coluna inteira tem de caber num ecrã de portátil, senão
             o `sticky` prende-a pelo topo e o fundo fica sempre cortado: é por
             isso que a fotografia é quadrada e não alta. */
          top: { md: 110 },
          mb: { xs: 4, md: 0 }
        }}>
          <Sobrescrita>O Preçário</Sobrescrita>
          <TituloSeccao destaque="& preços">Serviços</TituloSeccao>
          <Typography color="text.secondary" sx={{ maxWidth: "42ch" }}>
            Clique em marcar e vai direito ao passo seguinte, já com o serviço escolhido.
          </Typography>

          {/* Só em ecrã largo: no telemóvel era mais um ecrã de scroll antes
              de chegar ao primeiro preço.
              PROVISÓRIA — ver o bloco das fotografias em `lib/dados.ts`. */}
          <Box sx={{
            display: { xs: "none", md: "block" },
            /* Deitada, e não quadrada: com os grupos fechados a lista tem uns
               530px e uma fotografia quadrada punha esta coluna nos 790 — um
               buraco de 260px no lado direito. Assim as duas acabam à mesma
               altura, e a coluna continua a caber num ecrã de portátil, que é
               o que o `sticky` precisa. */
            position: "relative", aspectRatio: "4 / 3", mt: 4, overflow: "hidden",
            border: `1px solid ${comAlfa(cores.acento3, 0.25)}`
          }}>
            <Image
              src="/img/tmp-precario.jpg"
              alt="Cadeiras de barbeiro alinhadas ao longo da bancada, em luz quente"
              fill
              sizes="40vw"
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Box>

        <Box sx={{ minWidth: 0 }}>
        {GRUPOS.map((g) => {
          const doGrupo = SERVICOS.filter((s) => s.grupo === g);
          const aberto = !fechados.includes(g);

          return (
            <Accordion
              key={g}
              expanded={aberto}
              onChange={alternar(g)}
              slotProps={{
                transition: {
                  timeout: tempoPainel(doGrupo.length),
                  unmountOnExit: false,
                  easing: { enter: CURVA.painel, exit: CURVA.dobrar }
                }
              }}
              sx={{ mb: 3 }}
            >
              <AccordionSummary expandIcon={<Seta />} sx={{ px: 0 }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: "center", width: "100%", pr: 2 }}>
                  <Typography variant="overline" sx={{ color: "primary.main" }}>{g}</Typography>
                  <Chip label={doGrupo.length} size="small" color="primary" />
                  {/* O traço recolhe-se para o lado do título quando o grupo
                      fecha — dá ao fecho um segundo sinal, além da seta. */}
                  <Box sx={{
                    flex: 1, height: "1px", bgcolor: cores.fundo3,
                    transformOrigin: "left",
                    transform: aberto ? "scaleX(1)" : "scaleX(0.35)",
                    opacity: aberto ? 1 : 0.5,
                    transition: `transform ${TEMPO.painel}ms ${CURVA.painel}, opacity ${TEMPO.painel}ms ${CURVA.painel}`
                  }} />
                </Stack>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                <Stack component="ul" spacing={0.8} sx={{ listStyle: "none", m: 0, p: 0 }}>
                  {doGrupo.map((s, i) => <Linha key={s.id} s={s} aberto={aberto} ordem={i} />)}
                </Stack>
              </AccordionDetails>
            </Accordion>
          );
        })}
        </Box>
      </Envolve>
    </Box>
  );
}

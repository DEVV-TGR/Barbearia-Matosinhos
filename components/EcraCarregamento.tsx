"use client";

import Box from "@mui/material/Box";
import Marca from "./Marca";
import { cores, comAlfa, tituloFonte } from "@/app/design";
import { CURVA, TEMPO } from "@/lib/movimento";

/* Medidas do emblema: o anel é a caixa, o monograma vive dentro com folga.
   Em viewBox de 100, raio 46 dá uma circunferência de ~289 — daí os traços. */
const CAIXA = 148;
const LOGO = 96;
const PERIMETRO = 2 * Math.PI * 46;
const ARCO = PERIMETRO * 0.26;

/**
 * Ecrã que cobre o site enquanto a rota seguinte não chega: o monograma da casa
 * ao centro, anel a girar à volta.
 *
 * O monograma é letra, não imagem. A placa fotografada que serve de logo é bege
 * sobre bege: dentro de um anel, e sobre um fundo creme, não se via. Composto em
 * Cormorant, o M fica nítido em qualquer densidade de ecrã, herda a cor da casa
 * e não custa um pedido de rede no momento em que a página ainda está a carregar.
 *
 * Nunca é desmontado — só desvanece.
 */
export default function EcraCarregamento({ visivel }: { visivel: boolean }) {
  return (
    <Box
      data-carregamento
      role="status"
      aria-live="polite"
      aria-label={visivel ? "A carregar" : undefined}
      aria-hidden={!visivel}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: (t) => t.zIndex.modal + 20,
        display: "grid",
        placeItems: "center",
        bgcolor: cores.fundo,
        opacity: visivel ? 1 : 0,
        pointerEvents: visivel ? "auto" : "none",
        // `visibility` sai da equação só depois do desvanecer terminar; sem o
        // atraso, o ecrã desaparecia de golpe em vez de esmorecer.
        visibility: visivel ? "visible" : "hidden",
        transition: [
          `opacity ${TEMPO.loaderFade}ms ${visivel ? CURVA.entrada : CURVA.saida}`,
          `visibility 0ms linear ${visivel ? 0 : TEMPO.loaderFade}ms`
        ].join(", ")
      }}
    >
      {/* Brilho quente por trás do emblema, para o fundo não ficar chapado */}
      <Box sx={{
        position: "absolute",
        width: "min(70vw, 30rem)",
        aspectRatio: "1",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${comAlfa(cores.acento3, 0.13)} 0%, ${comAlfa(cores.acento3, 0)} 68%)`,
        animation: `respirar 3.4s ${CURVA.suave} infinite`
      }} />

      <Box sx={{ display: "grid", justifyItems: "center", gap: 3.2, position: "relative" }}>
        <Box sx={{
          position: "relative",
          width: CAIXA,
          height: CAIXA,
          display: "grid",
          placeItems: "center",
          // O emblema inteiro entra em cena, não aparece feito
          animation: `emblemaEntra ${TEMPO.longo}ms ${CURVA.entrada} both`
        }}>
          {/* Anel: calha fixa por baixo, arco a correr por cima */}
          <Box
            component="svg"
            viewBox="0 0 100 100"
            aria-hidden
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              animation: "girar 1.25s linear infinite",
              transformOrigin: "50% 50%"
            }}
          >
            <circle cx="50" cy="50" r="46" fill="none" stroke={cores.fundo3} strokeWidth="1.6" />
            <circle
              cx="50" cy="50" r="46" fill="none"
              stroke={cores.acento3}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray={`${ARCO} ${PERIMETRO - ARCO}`}
            />
          </Box>

          <Box sx={{
            width: LOGO,
            height: LOGO,
            display: "grid",
            placeItems: "center",
            animation: `pulsar 2.6s ${CURVA.suave} infinite`
          }}>
            <Box component="span" aria-hidden sx={{
              fontFamily: tituloFonte.style.fontFamily,
              fontSize: "3.6rem", lineHeight: 1, fontWeight: 400,
              letterSpacing: "-0.04em", color: cores.acento
            }}>
              M
            </Box>
          </Box>
        </Box>

        <Box sx={{ animation: `emblemaEntra ${TEMPO.longo}ms ${CURVA.entrada} 120ms both` }}>
          <Marca tamanho="pequeno" monograma={false} />
        </Box>
      </Box>
    </Box>
  );
}

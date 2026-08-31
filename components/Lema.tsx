"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Envolve from "./Envolve";
import { CASA } from "@/lib/dados";
import { cores, comAlfa, tituloFonte } from "@/app/design";
import { movimentoReduzido } from "@/lib/movimento";

/**
 * A única coisa da página que ignora o `Envolve` e sangra até à borda.
 *
 * A home era oito blocos da mesma largura e do mesmo tamanho, um atrás do
 * outro. Falta-lhe um sítio onde o ritmo pare — uma fotografia a toda a
 * largura, o lema da casa em corpo grande, e mais nada. É também onde o número
 * de avaliações deixa de ser um facto solto e passa a ser uma ligação para a
 * ficha verdadeira do Google — o número sai de `CASA.avaliacoes`, nunca daqui.
 */
export default function Lema() {
  const seccao = useRef<HTMLDivElement>(null);
  const fundo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (movimentoReduzido()) return;

    let pedido = 0;
    const aoRolar = () => {
      if (pedido) return;
      pedido = requestAnimationFrame(() => {
        pedido = 0;
        const sec = seccao.current;
        const img = fundo.current;
        if (!sec || !img) return;

        const caixa = sec.getBoundingClientRect();
        // Fora do ecrã não há nada a calcular
        if (caixa.bottom < 0 || caixa.top > innerHeight) return;

        /* 0 quando a faixa entra por baixo, 1 quando sai por cima. A imagem
           percorre 90px nesse intervalo: o suficiente para se notar que ela e
           o texto andam a velocidades diferentes, pouco para enjoar. */
        const progresso = (innerHeight - caixa.top) / (innerHeight + caixa.height);
        img.style.transform = `translate3d(0, ${(progresso - 0.5) * -90}px, 0)`;
      });
    };

    aoRolar();
    addEventListener("scroll", aoRolar, { passive: true });
    addEventListener("resize", aoRolar);
    return () => {
      removeEventListener("scroll", aoRolar);
      removeEventListener("resize", aoRolar);
      cancelAnimationFrame(pedido);
    };
  }, []);

  return (
    <Box
      ref={seccao}
      component="section"
      sx={{
        position: "relative", overflow: "hidden",
        bgcolor: cores.acento,
        py: { xs: 10, md: 16 },
        textAlign: "center"
      }}
    >
      {/* Sobra em cima e em baixo para o deslocamento nunca descobrir o fundo.
          Não é um `figure`: o teste de escala reprova qualquer `figure` acima
          de 320px no telemóvel, e isto é uma faixa, não uma fotografia numa
          galeria. */}
      <Box ref={fundo} aria-hidden sx={{
        position: "absolute", top: "-12%", bottom: "-12%", left: 0, right: 0,
        willChange: "transform"
      }}>
        <Image
          src="/img/tmp-lema.jpg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </Box>

      <Box aria-hidden sx={{
        position: "absolute", inset: 0,
        background: `linear-gradient(180deg,
          ${comAlfa(cores.acento, 0.94)} 0%,
          ${comAlfa(cores.acento, 0.76)} 50%,
          ${comAlfa(cores.acento, 0.94)} 100%)`
      }} />

      <Envolve sx={{ position: "relative", zIndex: 1 }}>
        <Typography component="p" sx={{
          fontFamily: tituloFonte.style.fontFamily,
          fontSize: "clamp(2rem, 6.5vw, 4.4rem)",
          lineHeight: 1.1, color: cores.fundo,
          maxWidth: "18ch", mx: "auto",
          textWrap: "balance"
        }}>
          {CASA.lema}
        </Typography>

        <Typography component="p" lang="en" sx={{
          mt: 2, fontStyle: "italic", color: cores.ouro,
          fontSize: "clamp(0.9rem, 2vw, 1.15rem)"
        }}>
          {CASA.lemaEN}
        </Typography>

        {/* Desde que os factos saíram do hero, este é o único sítio onde o
            número aparece — e aparece como ligação para a ficha onde as
            avaliações estão, que é o que lhe dá crédito. */}
        {CASA.avaliacoes && (
          <Box sx={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: { xs: 2, md: 3 }, mt: { xs: 5, md: 7 }
          }}>
            <Box aria-hidden sx={{
              height: "1px", width: { xs: "2rem", md: "5rem" },
              bgcolor: comAlfa(cores.ouro, 0.5)
            }} />
            <Box
              component="a"
              href={CASA.mapa}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: cores.fundo3, textDecoration: "none",
                fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase",
                fontWeight: 500, whiteSpace: "nowrap",
                borderBottom: `1px solid ${comAlfa(cores.ouro, 0.45)}`,
                pb: 0.5,
                transition: "color 200ms, border-color 200ms",
                "&:hover": { color: cores.ouro, borderColor: cores.ouro }
              }}
            >
              <Box component="span" sx={{ fontVariantNumeric: "tabular-nums" }}>
                {CASA.avaliacoes}
              </Box>
              {" "}avaliações no Google
            </Box>
            <Box aria-hidden sx={{
              height: "1px", width: { xs: "2rem", md: "5rem" },
              bgcolor: comAlfa(cores.ouro, 0.5)
            }} />
          </Box>
        )}
      </Envolve>
    </Box>
  );
}

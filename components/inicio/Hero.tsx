"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BotaoLink from "../BotaoLink";
import Envolve from "../Envolve";
import Marca from "../Marca";
import { CASA } from "@/lib/dados";
import { cores, comAlfa, tituloFonte } from "@/app/design";
import { movimentoReduzido } from "@/lib/movimento";

export default function Hero() {
  const parede = useRef<HTMLDivElement>(null);

  /* A parede desliza a um quarto da velocidade do scroll. É o único sítio do
     site com parallax, e é o que dá profundidade ao palco sem lhe pôr sombras:
     o wordmark fica quieto, a madeira atrás dele não. */
  useEffect(() => {
    if (movimentoReduzido()) return;

    let pedido = 0;
    const aoRolar = () => {
      if (pedido) return;
      pedido = requestAnimationFrame(() => {
        pedido = 0;
        const el = parede.current;
        // Só enquanto o hero ainda está no ecrã: passado isso, cada frame era
        // um `transform` a ser calculado para nada.
        if (el && scrollY < innerHeight) {
          el.style.transform = `translate3d(0, ${scrollY * 0.25}px, 0)`;
        }
      });
    };

    aoRolar();
    addEventListener("scroll", aoRolar, { passive: true });
    return () => { removeEventListener("scroll", aoRolar); cancelAnimationFrame(pedido); };
  }, []);

  return (
    <Box component="section" sx={{
      minHeight: "100svh", display: "grid", alignItems: "center",
      position: "relative", pt: { xs: 14, md: 16 }, pb: { xs: 8, md: 10 },
      overflow: "hidden", bgcolor: cores.acento
    }}>
      {/* Uma barbearia, e não uma textura. Desce 25% abaixo da secção para o
          parallax nunca chegar a descobrir o fundo, e por dentro aproxima-se
          devagar e sem fim — 26 segundos para 7% de escala, que se nota sem
          nunca se apanhar a mexer. */}
      <Box ref={parede} aria-hidden sx={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: "-25%",
        zIndex: 0, willChange: "transform"
      }}>
        <Box sx={{
          position: "absolute", inset: 0,
          animation: "aproximar 26s ease-in-out infinite alternate"
        }}>
          <Image
            src="/img/tmp-salao.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 62%" }}
          />
        </Box>
      </Box>

      {/* A parede de ripado da casa por cima da fotografia, quase apagada: é o
          que puxa a cena de volta para esta barbearia e não para a da foto. */}
      <Box aria-hidden sx={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0.22, mixBlendMode: "overlay" }}>
        <Image src="/img/parede-ripado.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
      </Box>

      {/* O véu. A madeira fica a servir de grão e de calor; o que se lê por cima
          é texto creme sobre preto, com os 15:1 que isso dá. */}
      <Box aria-hidden sx={{
        position: "absolute", inset: 0, zIndex: 2,
        background: `linear-gradient(180deg,
          ${comAlfa(cores.acento, 0.93)} 0%,
          ${comAlfa(cores.acento, 0.8)} 42%,
          ${comAlfa(cores.acento, 0.97)} 100%)`
      }} />

      {/* O ripado desenhado por cima do ripado fotografado: a fotografia dá o
          calor e a irregularidade, esta dá o risco nítido em qualquer ecrã. */}
      <Box aria-hidden sx={{
        position: "absolute", inset: 0, zIndex: 3, opacity: 0.45,
        backgroundImage: `repeating-linear-gradient(90deg,
          ${comAlfa(cores.ouro, 0.16)} 0 1px,
          transparent 1px 15px)`,
        maskImage: "radial-gradient(120% 90% at 50% 35%, #000 20%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(120% 90% at 50% 35%, #000 20%, transparent 80%)"
      }} />

      <Envolve sx={{ position: "relative", zIndex: 4, textAlign: "center" }}>
        <Marca tamanho="grande" cor={cores.fundo} corConceito={cores.ouro} />

        <Box sx={{ maxWidth: "34ch", mx: "auto", mt: { xs: 5, md: 6 } }}>
          <Typography component="p" sx={{
            fontFamily: tituloFonte.style.fontFamily,
            fontSize: "clamp(1.35rem, 3.4vw, 2rem)",
            lineHeight: 1.25, color: cores.fundo,
            // Sem isto o lema partia com o "o" sozinho no fim da primeira linha
            textWrap: "balance"
          }}>
            {CASA.lema}
          </Typography>
          {/* A marca é bilingue no impresso. O site é português, mas o lema é a
              assinatura da casa e perde-se se lhe tirarmos metade. */}
          <Typography component="p" lang="en" sx={{
            mt: 1.2, fontStyle: "italic", color: cores.ouro,
            fontSize: "clamp(0.85rem, 1.7vw, 1rem)"
          }}>
            {CASA.lemaEN}
          </Typography>
        </Box>

        <Typography variant="overline" component="p" sx={{ color: cores.fundo3, mt: 4 }}>
          Barbearia em {CASA.localidade}
        </Typography>

        {/* Em ecrã estreito os dois não cabiam lado a lado (423px em 393px):
            quebravam de linha e ficavam com larguras diferentes. Aqui dividem
            a largura em partes iguais. */}
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", sm: "auto auto" },
          justifyContent: { sm: "center" },
          gap: 1.2, mt: 3.5,
          "& .MuiButton-root": {
            px: { xs: 1.2, sm: 3.6 },
            py: { xs: 1.1, sm: 1.7 },
            fontSize: { xs: 13, sm: 15 },
            whiteSpace: "nowrap"
          }
        }}>
          {/* Sobre o preto os papéis trocam-se: o botão cheio é o creme. */}
          <BotaoLink href="/marcar" variant="contained" size="large" sx={{
            bgcolor: cores.fundo, color: cores.acento,
            "&:hover": { bgcolor: cores.fundo3, color: cores.acento }
          }}>
            {/* "Marcar a minha vez" não cabe numa linha em meio ecrã e fazia o
                botão crescer para 77px de altura. */}
            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
              Marcar a minha vez
            </Box>
            <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
              Marcar vez
            </Box>
          </BotaoLink>
          <BotaoLink href="#servicos" variant="outlined" size="large" sx={{
            borderColor: comAlfa(cores.ouro, 0.65), color: cores.fundo,
            "&:hover": { borderColor: cores.ouro, bgcolor: comAlfa(cores.ouro, 0.14) }
          }}>
            Ver preços
          </BotaoLink>
        </Box>

      </Envolve>
    </Box>
  );
}

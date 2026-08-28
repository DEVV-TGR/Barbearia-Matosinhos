import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { cores, comAlfa, tituloFonte, TEXTO_MINIMO } from "@/app/design";

/**
 * Uma fotografia, ou o lugar dela.
 *
 * As fotografias do espaço ainda não existem. A alternativa a isto seria deixar
 * buracos ou encher a página com fotos de outra casa; o que se faz aqui é
 * ocupar exactamente as mesmas medidas com uma moldura e o monograma, para que
 * o dia em que as fotos entrarem não mude uma linha de desenho — muda-se o
 * `src` em `lib/dados.ts` e mais nada.
 */
export default function Moldura({
  src, alt, sizes, priority
}: {
  src: string | null;
  alt: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover" }}
      />
    );
  }

  return (
    <Box
      role="img"
      aria-label={`${alt} — fotografia por chegar`}
      sx={{
        position: "absolute", inset: 0,
        display: "grid", placeItems: "center",
        bgcolor: cores.fundo2,
        backgroundImage: `repeating-linear-gradient(90deg,
          ${comAlfa(cores.acento3, 0.05)} 0 1px, transparent 1px 9px)`,
        p: 3
      }}
    >
      <Box sx={{
        border: `1px solid ${comAlfa(cores.acento3, 0.4)}`,
        position: "absolute", inset: "0.75rem"
      }} />
      {/* O marcador diz o que ali vai ficar. Uma moldura vazia lê-se como um
          erro de carregamento; com a legenda lê-se como um lugar reservado. */}
      <Box sx={{ textAlign: "center", color: cores.acento3, position: "relative", maxWidth: "22ch" }}>
        <Typography component="span" aria-hidden sx={{
          fontFamily: tituloFonte.style.fontFamily, fontSize: "2.8rem",
          lineHeight: 1, letterSpacing: "-0.04em", opacity: 0.5, display: "block"
        }}>
          M
        </Typography>
        <Typography component="span" sx={{
          display: "block", mt: 1.5, color: cores.texto3,
          fontSize: 13, lineHeight: 1.45
        }}>
          {alt}
        </Typography>
        <Typography component="span" sx={{
          display: "block", mt: 1, color: comAlfa(cores.texto3, 0.8),
          fontSize: TEXTO_MINIMO, textTransform: "uppercase", letterSpacing: "0.2em"
        }}>
          Fotografia por chegar
        </Typography>
      </Box>
    </Box>
  );
}

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { cores, comAlfa, tituloFonte, TEXTO_MINIMO } from "@/app/design";

/**
 * O wordmark da casa, composto com letra em vez de servido como imagem.
 *
 * O logo que existe é uma fotografia de uma placa: pesa, não escala e traz
 * consigo o bege do estúdio onde foi fotografada. Como o wordmark é só uma
 * serifa em maiúsculas espaçadas — que é exactamente o que a Cormorant faz —,
 * compô-lo aqui dá-nos texto seleccionável, nítido em qualquer densidade de
 * ecrã, e que acompanha a cor de quem o usa.
 */

/* O "MALE CONCEPT" é a linha mais pequena do site e a primeira a querer descer
   abaixo do legível — no impresso pode, num ecrã não. Nenhum tamanho vai abaixo
   dos 12px de `TEXTO_MINIMO`; o que encolhe é o espaçamento entre as letras,
   que é o que faz a linha caber sem a tornar ilegível. */
const MEDIDAS = {
  pequeno: { monograma: "1.6rem", nome: "1.1rem", conceito: TEXTO_MINIMO, letra: "0.18em", risco: "0.7rem", espaco: 0.7 },
  medio:   { monograma: "2.6rem", nome: "1.7rem", conceito: TEXTO_MINIMO + 1, letra: "0.28em", risco: "1.4rem", espaco: 1 },
  grande:  { monograma: "5.5rem", nome: "clamp(2.4rem, 9vw, 5.4rem)", conceito: TEXTO_MINIMO + 2, letra: "0.34em", risco: "3rem", espaco: 1.6 }
} as const;

export default function Marca({
  tamanho = "medio",
  monograma = true,
  cor = cores.texto,
  corConceito
}: {
  tamanho?: keyof typeof MEDIDAS;
  monograma?: boolean;
  cor?: string;
  corConceito?: string;
}) {
  const m = MEDIDAS[tamanho];
  const conceito = corConceito ?? cores.acento3;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: cor }}>
      {monograma && (
        <Typography
          component="span"
          aria-hidden
          sx={{
            fontFamily: tituloFonte.style.fontFamily,
            fontSize: m.monograma,
            lineHeight: 0.9,
            fontWeight: 400,
            /* O monograma do logo é um M com as hastes quase a tocar-se. O
               tracking negativo é o único sítio do site onde ele aparece. */
            letterSpacing: "-0.04em",
            mb: m.espaco * 0.35
          }}
        >
          M
        </Typography>
      )}

      <Typography
        component="span"
        sx={{
          fontFamily: tituloFonte.style.fontFamily,
          fontSize: m.nome,
          lineHeight: 1,
          fontWeight: 400,
          textTransform: "uppercase",
          /* Sem este espaço não é o mesmo logo. */
          letterSpacing: "0.2em",
          /* O tracking acrescenta espaço depois da última letra também, e é
             isso que descentra um texto centrado. */
          textIndent: "0.2em"
        }}
      >
        Man Space
      </Typography>

      <Box sx={{
        display: "flex", alignItems: "center", gap: m.espaco,
        mt: m.espaco * 0.55, color: conceito
      }}>
        <Box sx={{ width: m.risco, height: "1px", bgcolor: "currentColor", opacity: 0.75 }} />
        <Typography
          component="span"
          sx={{
            fontSize: m.conceito,
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: m.letra,
            textIndent: m.letra,
            lineHeight: 1
          }}
        >
          Male Concept
        </Typography>
        <Box sx={{ width: m.risco, height: "1px", bgcolor: "currentColor", opacity: 0.75 }} />
      </Box>
    </Box>
  );
}

/**
 * Moldura de esquadria — o filete com cantos que delimita cada bloco do poster.
 * É desenhada com quatro cantos em vez de uma borda inteira porque é isso que
 * lá está: a linha não fecha, marca só as pontas.
 */
export function Esquadria({
  children, sx, canto = 18
}: { children: React.ReactNode; sx?: object; canto?: number }) {
  const traco = `1px solid ${comAlfa(cores.acento3, 0.55)}`;
  /* Recuadas para dentro: assentes sobre a borda da caixa, os cantos ficavam
     com duas linhas em cima uma da outra e liam-se como um defeito. */
  const r = 7;
  const pontas = [
    { top: r, left: r, borderTop: traco, borderLeft: traco },
    { top: r, right: r, borderTop: traco, borderRight: traco },
    { bottom: r, left: r, borderBottom: traco, borderLeft: traco },
    { bottom: r, right: r, borderBottom: traco, borderRight: traco }
  ];

  return (
    <Box sx={{ position: "relative", ...sx }}>
      {pontas.map((p, i) => (
        <Box key={i} aria-hidden sx={{
          position: "absolute", width: canto, height: canto, pointerEvents: "none", ...p
        }} />
      ))}
      {children}
    </Box>
  );
}

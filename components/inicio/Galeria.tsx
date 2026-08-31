import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Envolve from "../Envolve";
import Moldura from "../Moldura";
import Sobrescrita from "../Sobrescrita";
import TituloSeccao from "../TituloSeccao";
import { GALERIA, PAREDE } from "@/lib/dados";
import { cores, comAlfa } from "@/app/design";
import { CURVA, TEMPO } from "@/lib/movimento";

/* Uma gradação quente, igual para todas. As fotografias não vêm todas do mesmo
   sítio nem da mesma luz — uma é azulada, outra é a preto e branco — e sem isto
   liam-se como quatro imagens avulsas coladas na mesma página. Com a mesma
   gradação passam a ser um conjunto, e um conjunto na cor da casa. */
const GRADACAO = "sepia(0.28) saturate(0.86) contrast(1.05) brightness(0.96)";

/* A parede é a única que é mesmo da casa e já vem quente da madeira: com a
   mesma dose de sépia das outras ficava laranja ao lado do creme da página. */
const GRADACAO_PAREDE = "saturate(0.72) brightness(0.97)";

export default function Galeria() {
  return (
    /* `default` e não `paper`: as avaliações, que vêm imediatamente antes,
       ficaram em `paper`, e duas superfícies iguais coladas leem-se como uma
       secção só, muito comprida. */
    <Box component="section" id="espaco" sx={{ py: { xs: 5, md: 12 } }}>
      <Envolve>
        <Sobrescrita>Ao pormenor</Sobrescrita>
        <TituloSeccao destaque="ofício">O</TituloSeccao>
        <Typography color="text.secondary" sx={{ maxWidth: "56ch", mb: { xs: 3.5, md: 5 } }}>
          A parede da casa, e o que ali se faz visto de perto.
        </Typography>

        {/* A parede a toda a largura, antes do mosaico: é a única destas
            fotografias que é mesmo daquela loja, e por isso vem primeiro e
            vem maior. */}
        <Box
          component="figure"
          sx={{
            m: 0, position: "relative", overflow: "hidden",
            aspectRatio: String(PAREDE.ratio),
            bgcolor: cores.fundo3,
            border: `1px solid ${comAlfa(cores.acento3, 0.22)}`,
            "& img": { filter: GRADACAO_PAREDE }
          }}
        >
          <Moldura src={PAREDE.src} alt={PAREDE.alt} sizes="(max-width: 900px) 92vw, 1180px" />
        </Box>

        {/* Uma grelha, e não colunas: com quatro fotos em quatro colunas o
            navegador punha uma em cada e a mais baixa deixava um buraco no
            meio da linha. Aqui as alturas continuam a ser as das fotografias —
            o `ratio` vem dos dados —, mas quem desencontra a linha é o degrau,
            que é uma decisão e não uma sobra. */}
        <Box sx={{
          display: "grid",
          /* Duas colunas já no telemóvel: numa coluna só, as fotos faziam
             três ecrãs de scroll. */
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
          gap: { xs: 1.2, md: 2 },
          alignItems: "start",
          mt: { xs: 1.2, md: 2 }
        }}>
          {GALERIA.map((g, i) => (
            <Box
              component="figure"
              key={g.alt}
              sx={{
                m: 0, overflow: "hidden", position: "relative",
                // O degrau só em ecrã largo: no telemóvel são duas colunas
                // curtas e o desencontro só as afastava do título.
                mt: { md: i % 2 === 1 ? 6 : 0 },
                aspectRatio: String(g.ratio),
                bgcolor: cores.fundo3,
                border: `1px solid ${comAlfa(cores.acento3, 0.22)}`,
                "&:hover img": { transform: "scale(1.04)" },
                "&:hover figcaption": { opacity: 1, transform: "none" },
                "& img": {
                  filter: GRADACAO,
                  transition: `transform 900ms ${CURVA.entrada}`
                }
              }}
            >
              <Moldura
                src={g.src}
                alt={g.alt}
                sizes="(max-width: 900px) 45vw, 24vw"
              />
              {/* O numeral é o mesmo gesto dos packs e dos retratos: dá ordem
                  ao mosaico sem lhe pôr uma legenda por cima. */}
              <Typography component="span" aria-hidden sx={{
                position: "absolute", top: 10, left: 12, zIndex: 2,
                color: cores.ouro, fontSize: 13, fontWeight: 500,
                letterSpacing: "0.16em",
                textShadow: `0 1px 6px ${comAlfa(cores.acento, 0.8)}`
              }}>
                0{i + 1}
              </Typography>
              <Typography
                component="figcaption"
                variant="body2"
                sx={{
                  position: "absolute", inset: "auto 0 0 0",
                  px: 2, pt: 5, pb: 2, color: cores.fundo,
                  background: `linear-gradient(180deg, transparent, ${comAlfa(cores.acento, 0.92)})`,
                  opacity: 0, transform: "translateY(8px)",
                  transition: `opacity ${TEMPO.medio}ms ${CURVA.suave}, transform ${TEMPO.medio}ms ${CURVA.suave}`
                }}
              >
                {g.alt}
              </Typography>
            </Box>
          ))}
        </Box>
      </Envolve>
    </Box>
  );
}

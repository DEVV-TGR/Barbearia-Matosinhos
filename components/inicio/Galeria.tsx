import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Envolve from "../Envolve";
import Moldura from "../Moldura";
import Sobrescrita from "../Sobrescrita";
import TituloSeccao from "../TituloSeccao";
import { GALERIA } from "@/lib/dados";
import { cores, comAlfa } from "@/app/design";

export default function Galeria() {
  return (
    <Box component="section" id="espaco" sx={{ py: { xs: 6, md: 12 }, bgcolor: "background.paper" }}>
      <Envolve>
        <Sobrescrita>Por dentro</Sobrescrita>
        <TituloSeccao destaque="espaço">O</TituloSeccao>

        {/* Mosaico por colunas: as fotos da casa não têm todas a mesma forma e
            uma grelha de altura fixa cortava-as a meio. O `ratio` vem dos dados
            para que o lugar de cada uma já esteja marcado antes de existir. */}
        <Box sx={{
          /* Duas colunas já no telemóvel: numa coluna só, as cinco fotos
             faziam 3,3 ecrãs de scroll. */
          columnCount: { xs: 2, md: 3 },
          columnGap: { xs: "0.6rem", md: "1rem" },
          mt: { xs: 3.5, md: 5 }
        }}>
          {GALERIA.map((g) => (
            <Box
              component="figure"
              key={g.alt}
              sx={{
                m: 0, mb: { xs: 1.2, md: 2 }, overflow: "hidden",
                breakInside: "avoid", position: "relative",
                aspectRatio: String(g.ratio),
                bgcolor: cores.fundo3,
                border: `1px solid ${comAlfa(cores.acento3, 0.22)}`,
                "&:hover img": { transform: "scale(1.04)" },
                "&:hover figcaption": { opacity: 1, transform: "none" },
                "& img": { transition: "transform 900ms cubic-bezier(0.22,1,0.36,1)" }
              }}
            >
              <Moldura
                src={g.src}
                alt={g.alt}
                sizes="(max-width: 600px) 45vw, (max-width: 900px) 45vw, 30vw"
              />
              <Typography
                component="figcaption"
                variant="body2"
                sx={{
                  position: "absolute", inset: "auto 0 0 0",
                  px: 2, pt: 5, pb: 2, color: cores.fundo,
                  background: `linear-gradient(180deg, transparent, ${comAlfa(cores.acento, 0.92)})`,
                  opacity: 0, transform: "translateY(8px)",
                  transition: "opacity 420ms, transform 420ms"
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

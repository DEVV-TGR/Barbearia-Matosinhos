import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Envolve from "../Envolve";
import Sobrescrita from "../Sobrescrita";
import TituloSeccao from "../TituloSeccao";
import { CASA, TESTEMUNHOS } from "@/lib/dados";
import { cores, comAlfa, tituloFonte } from "@/app/design";

/**
 * O que os clientes dizem.
 *
 * Devolve `null` enquanto não houver avaliações verdadeiras. É por isso que a
 * homepage a monta condicionalmente: uma secção com três citações inventadas
 * seria a única coisa nesta página que não é verdade.
 */
export default function Testemunhos() {
  if (TESTEMUNHOS.length === 0) return null;

  return (
    <Box component="section" id="testemunhos" sx={{ py: { xs: 6, md: 12 }, bgcolor: "background.paper" }}>
      <Envolve>
        <Sobrescrita centrado>O que dizem</Sobrescrita>
        <TituloSeccao destaque="cadeira" sx={{ textAlign: "center" }}>Quem se senta na</TituloSeccao>

        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: { xs: 3, md: 4 },
          mt: { xs: 4, md: 6 }
        }}>
          {TESTEMUNHOS.map((t) => (
            <Box
              component="figure"
              key={t.autor + t.texto.slice(0, 24)}
              sx={{
                m: 0, p: { xs: 3, md: 3.5 },
                border: `1px solid ${comAlfa(cores.acento3, 0.28)}`,
                display: "flex", flexDirection: "column", height: "100%"
              }}
            >
              <Box aria-hidden sx={{
                fontFamily: tituloFonte.style.fontFamily, fontSize: "3rem", lineHeight: 0.6,
                color: comAlfa(cores.acento3, 0.45), mb: 1.5
              }}>
                &ldquo;
              </Box>
              <Typography component="blockquote" sx={{
                fontFamily: tituloFonte.style.fontFamily,
                fontSize: "1.3rem", lineHeight: 1.45, m: 0, flex: 1
              }}>
                {t.texto}
              </Typography>
              <Typography component="figcaption" variant="overline" sx={{ color: cores.acento3, mt: 2.5 }}>
                {t.autor}
                {t.estrelas != null && (
                  <Box component="span" aria-label={`${t.estrelas} em 5`} sx={{ ml: 1.2, letterSpacing: "0.1em" }}>
                    {"★".repeat(t.estrelas)}
                  </Box>
                )}
              </Typography>
            </Box>
          ))}
        </Box>

        {CASA.avaliacoes != null && (
          <Typography variant="overline" component="p" sx={{
            color: cores.texto3, textAlign: "center", mt: 4
          }}>
            {CASA.avaliacoes} avaliações
          </Typography>
        )}
      </Envolve>
    </Box>
  );
}

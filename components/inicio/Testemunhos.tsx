import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Envolve from "../Envolve";
import Sobrescrita from "../Sobrescrita";
import TituloSeccao from "../TituloSeccao";
import { CASA, TESTEMUNHOS } from "@/lib/dados";
import { cores, comAlfa, tituloFonte } from "@/app/design";

/**
 * O que os clientes dizem, palavra por palavra.
 *
 * Devolve `null` enquanto não houver avaliações verdadeiras — é por isso que a
 * homepage a monta condicionalmente. Nada aqui é escrito: os textos são os que
 * as pessoas deixaram no Google, copiados tal e qual, com os nomes que elas
 * próprias publicaram.
 *
 * Duas colunas, como o preçário, e as citações separadas por filetes em vez de
 * metidas em caixas — é a mesma linguagem das linhas do preçário e da lista de
 * ofícios da secção "A Casa".
 */
export default function Testemunhos() {
  if (TESTEMUNHOS.length === 0) return null;

  return (
    <Box component="section" id="testemunhos" sx={{ py: { xs: 5, md: 12 }, bgcolor: "background.paper" }}>
      <Envolve sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "0.8fr 1.2fr" },
        gap: { xs: 0, md: 7 },
        alignItems: "start"
      }}>
        <Box sx={{
          // Um item de grelha não encolhe abaixo do conteúdo se não lho dizerem
          minWidth: 0,
          position: { md: "sticky" }, top: { md: 110 },
          mb: { xs: 4, md: 0 }
        }}>
          <Sobrescrita>O que dizem</Sobrescrita>
          <TituloSeccao destaque="cadeira">Quem se senta na</TituloSeccao>

          {CASA.estrelas != null && (
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, mt: 1 }}>
              <Box
                component="span"
                aria-label={`${CASA.estrelas} estrelas em 5`}
                sx={{
                  color: cores.acento3, fontSize: "1.15rem", letterSpacing: "0.14em",
                  lineHeight: 1
                }}
              >
                {"★".repeat(CASA.estrelas)}
              </Box>
              <Typography variant="overline" sx={{ color: cores.texto3 }}>
                no Google
              </Typography>
            </Box>
          )}

          <Typography color="text.secondary" sx={{ maxWidth: "38ch", mt: 2.5 }}>
            Copiadas da ficha da casa, sem uma palavra mudada.{" "}
            <Box
              component="a"
              href={CASA.mapa}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: cores.acento3, textDecoration: "none",
                borderBottom: `1px solid ${comAlfa(cores.acento3, 0.45)}`,
                "&:hover": { borderColor: cores.acento3 }
              }}
            >
              Ver todas
            </Box>.
          </Typography>
        </Box>

        <Box sx={{ minWidth: 0 }}>
          {TESTEMUNHOS.map((t, i) => (
            <Box
              component="figure"
              key={t.autor + t.texto.slice(0, 24)}
              sx={{
                m: 0,
                py: { xs: 2.4, md: 3.5 },
                borderTop: i === 0 ? "none" : `1px solid ${comAlfa(cores.acento3, 0.25)}`
              }}
            >
              <Typography component="blockquote" sx={{
                fontFamily: tituloFonte.style.fontFamily,
                fontSize: { xs: "1.2rem", md: "1.42rem" },
                lineHeight: 1.45, m: 0, color: cores.texto,
                // As aspas ficam fora da margem, e o texto alinha com o resto
                textIndent: "-0.42em",
                /* Vieram do Google com quebras de linha próprias: quem as
                   escreveu carregou no Enter, e apagá-las era reescrever. */
                whiteSpace: "pre-line"
              }}>
                &ldquo;{t.texto}&rdquo;
              </Typography>

              <Box component="figcaption" sx={{
                display: "flex", alignItems: "baseline", gap: 1.5,
                flexWrap: "wrap", mt: 1.6
              }}>
                <Typography variant="overline" sx={{ color: cores.acento3 }}>
                  {t.autor}
                </Typography>
                {t.estrelas != null && (
                  <Box
                    component="span"
                    aria-label={`${t.estrelas} estrelas em 5`}
                    sx={{
                      color: comAlfa(cores.acento3, 0.65), fontSize: 13,
                      letterSpacing: "0.12em", lineHeight: 1
                    }}
                  >
                    {"★".repeat(t.estrelas)}
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Envolve>
    </Box>
  );
}

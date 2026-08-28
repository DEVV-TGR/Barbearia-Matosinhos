import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BotaoLink from "../BotaoLink";
import Envolve from "../Envolve";
import { Esquadria } from "../Marca";
import Sobrescrita from "../Sobrescrita";
import TituloSeccao from "../TituloSeccao";
import { SERVICOS } from "@/lib/dados";
import { duracao, euros } from "@/lib/formatar";
import { cores, comAlfa, tituloFonte } from "@/app/design";

/* Os packs, por ordem de preço decrescente: o de 50 € primeiro, que é o que a
   casa quer mostrar. Sai dos dados — nenhum nome escrito aqui. */
const PACKS = SERVICOS.filter((s) => s.inclui?.length).sort((a, b) => b.preco - a.preco);

const ROMANOS = ["I", "II", "III", "IV"];

export default function Experiencias() {
  if (PACKS.length === 0) return null;

  return (
    <Box component="section" id="experiencias" sx={{ py: { xs: 6, md: 12 } }}>
      <Envolve>
        <Sobrescrita centrado>Experiências Man Space</Sobrescrita>
        <TituloSeccao destaque="numa hora" sx={{ textAlign: "center" }}>
          A carta inteira
        </TituloSeccao>
        <Typography color="text.secondary" sx={{ maxWidth: "52ch", mx: "auto", textAlign: "center" }}>
          Somar serviços à conta sai mais caro e leva mais tempo. Os packs são a
          casa inteira de uma assentada, com hora marcada.
        </Typography>

        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: `repeat(${Math.min(PACKS.length, 2)}, 1fr)` },
          gap: { xs: 3, md: 4 },
          mt: { xs: 4, md: 6 },
          alignItems: "start"
        }}>
          {PACKS.map((p, i) => (
            <Esquadria
              key={p.id}
              canto={22}
              sx={{
                bgcolor: cores.fundo2,
                border: `1px solid ${comAlfa(cores.acento3, 0.32)}`,
                p: { xs: 3, md: 4 },
                display: "flex", flexDirection: "column", height: "100%"
              }}
            >
              {/* O numeral é o que dá ordem sem repetir "pack 1", "pack 2" —
                  e é o que o impresso faz. */}
              <Typography component="span" aria-hidden sx={{
                fontFamily: tituloFonte.style.fontFamily, color: comAlfa(cores.acento3, 0.55),
                fontSize: "1.4rem", letterSpacing: "0.2em", lineHeight: 1, mb: 2
              }}>
                {ROMANOS[i] ?? i + 1}
              </Typography>

              <Box sx={{
                display: "flex", alignItems: "baseline", justifyContent: "space-between",
                gap: 2, flexWrap: "wrap"
              }}>
                <Typography variant="h3" component="h3" sx={{ fontSize: "clamp(1.5rem, 3.4vw, 2.1rem)" }}>
                  {p.nome}
                </Typography>
                <Typography component="span" sx={{
                  fontFamily: tituloFonte.style.fontFamily, fontSize: "2.4rem",
                  fontWeight: 500, color: cores.acento3, lineHeight: 1, whiteSpace: "nowrap"
                }}>
                  {euros(p.preco)}
                </Typography>
              </Box>

              <Typography color="text.secondary" sx={{ mt: 1 }}>
                {p.descricao}
              </Typography>
              <Typography variant="overline" sx={{ color: cores.texto3, mt: 0.5, display: "block" }}>
                {duracao(p.minutos)} · {p.inclui!.length} serviços
              </Typography>

              <Box component="ul" sx={{
                listStyle: "none", m: 0, mt: 3, p: 0,
                borderTop: `1px solid ${comAlfa(cores.acento3, 0.25)}`,
                flex: 1
              }}>
                {p.inclui!.map((item) => (
                  <Box
                    component="li"
                    key={item}
                    sx={{
                      display: "flex", alignItems: "baseline", gap: 1.5,
                      py: 1.1, borderBottom: `1px solid ${comAlfa(cores.acento3, 0.16)}`
                    }}
                  >
                    <Box aria-hidden sx={{
                      width: "0.55rem", height: "1px", flex: "none",
                      bgcolor: cores.acento3, transform: "translateY(-0.3em)"
                    }} />
                    <Typography variant="body2" sx={{ color: cores.texto2 }}>{item}</Typography>
                  </Box>
                ))}
              </Box>

              <BotaoLink
                href={`/marcar?servico=${encodeURIComponent(p.id)}`}
                variant={i === 0 ? "contained" : "outlined"}
                fullWidth
                sx={{ mt: 3 }}
              >
                Marcar {p.nome}
              </BotaoLink>
            </Esquadria>
          ))}
        </Box>
      </Envolve>
    </Box>
  );
}

"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Envolve from "./Envolve";
import EstadoLoja from "./EstadoLoja";
import Marca from "./Marca";
import { CASA } from "@/lib/dados";
import { cores, comAlfa } from "@/app/design";

const ORDEM = [1, 2, 3, 4, 5, 6, 0]; // a semana começa à segunda, como num postal

function Coluna({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <Box>
      <Typography variant="overline" component="h2" sx={{ color: cores.acento3, display: "block", mb: 1.5 }}>
        {titulo}
      </Typography>
      {children}
    </Box>
  );
}

export default function Rodape() {
  const hoje = new Date().getDay();

  return (
    <Box component="footer" sx={{ borderTop: `1px solid ${comAlfa(cores.acento3, 0.3)}`, bgcolor: "background.paper", pt: 6, pb: 4 }}>
      <Envolve>
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.3fr 1fr 1fr" },
          gap: { xs: 4, md: 5 },
          mb: 5
        }}>
          <Box>
            <Box sx={{ display: "inline-flex" }}>
              <Marca tamanho="pequeno" monograma={false} />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {/* A morada ainda não chegou. Enquanto não chegar, mostra-se o que
                  se sabe em vez de uma linha vazia ou de um "a confirmar". */}
              {CASA.morada && <>{CASA.morada}<br /></>}
              {[CASA.codigoPostal, CASA.localidade].filter(Boolean).join(" ")}
            </Typography>
            {CASA.telefoneRaw && (
              <Typography sx={{ mt: 2 }}>
                {/* O número visível vem do mesmo sítio que o `tel:`. Escritos
                    à mão em sítios diferentes, acabam por discordar. */}
                <Box component="a" href={`tel:${CASA.telefoneRaw}`}
                  sx={{ color: cores.acento3, fontWeight: 500, textDecoration: "none" }}>
                  {CASA.telefone}
                </Box>
              </Typography>
            )}
            <Typography sx={{ mt: CASA.telefoneRaw ? 1 : 2 }}>
              <Box component="a" href={CASA.instagram} target="_blank" rel="noopener"
                sx={{ color: cores.acento3, fontWeight: 500, textDecoration: "none", fontSize: 15 }}>
                @manspace.pt
              </Box>
            </Typography>
          </Box>

          <Coluna titulo="Horário">
            <Stack component="ul" spacing={0.6} sx={{ listStyle: "none", m: 0, p: 0 }}>
              {ORDEM.map((i) => {
                const h = CASA.horario[i];
                return (
                  <Box component="li" key={h.dia} sx={{
                    display: "flex", justifyContent: "space-between", gap: 2,
                    fontSize: 15,
                    color: i === hoje ? cores.acento3 : "text.secondary",
                    fontWeight: i === hoje ? 600 : 400
                  }}>
                    <span>{h.dia}</span>
                    <span>{h.aberto ? `${h.abre}–${h.fecha}` : "Encerrado"}</span>
                  </Box>
                );
              })}
            </Stack>
            <EstadoLoja />
          </Coluna>

          <Coluna titulo="Navegar">
            <Stack component="ul" spacing={0.8} sx={{ listStyle: "none", m: 0, p: 0 }}>
              {[
                { r: "Início", h: "/" },
                { r: "Serviços e preços", h: "/#servicos" },
                { r: "A equipa", h: "/#equipa" },
                { r: "Marcar a minha vez", h: "/marcar" }
              ].map((l) => (
                <Box component="li" key={l.h} sx={{ fontSize: 15 }}>
                  <Box component={Link} href={l.h}
                    sx={{ color: "text.secondary", textDecoration: "none", "&:hover": { color: cores.acento3 } }}>
                    {l.r}
                  </Box>
                </Box>
              ))}
              <Box component="li" sx={{ fontSize: 15 }}>
                <Box component="a" href={CASA.mapa} target="_blank" rel="noopener"
                  sx={{ color: "text.secondary", textDecoration: "none", "&:hover": { color: cores.acento3 } }}>
                  Como chegar
                </Box>
              </Box>
            </Stack>
          </Coluna>
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}
          sx={{ justifyContent: "space-between", borderTop: `1px solid ${comAlfa(cores.acento3, 0.28)}`, pt: 2.5 }}>
          <Typography variant="caption" sx={{ color: cores.texto3 }}>
            © {new Date().getFullYear()} {CASA.nomeCompleto}
          </Typography>
          <Typography variant="caption" sx={{ color: cores.acento3 }}>
            Site de demonstração — não é o site oficial da barbearia.
          </Typography>
        </Stack>
      </Envolve>
    </Box>
  );
}

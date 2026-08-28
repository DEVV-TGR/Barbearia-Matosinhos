import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Envolve from "../Envolve";
import Sobrescrita from "../Sobrescrita";
import TituloSeccao from "../TituloSeccao";
import EstadoLoja from "../EstadoLoja";
import { CASA } from "@/lib/dados";
import { cores, comAlfa } from "@/app/design";

const ORDEM = [1, 2, 3, 4, 5, 6, 0];

function LinhaContacto({ rotulo, children }: { rotulo: string; children: React.ReactNode }) {
  return (
    <Box component="li" sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", sm: "7rem 1fr" },
      gap: { xs: 0.5, sm: 2.5 },
      alignItems: "baseline",
      py: 2, borderBottom: `1px solid ${comAlfa(cores.acento3, 0.28)}`
    }}>
      <Typography variant="overline" sx={{ color: cores.texto3 }}>{rotulo}</Typography>
      <Box sx={{ "& a": { color: cores.acento3, textDecoration: "none", "&:hover": { textDecoration: "underline" } } }}>
        {children}
      </Box>
    </Box>
  );
}

export default function Visitar() {
  return (
    <Box component="section" id="visitar" sx={{ py: { xs: 6, md: 12 } }}>
      <Envolve>
       <Box sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" },
        gap: { xs: 5, md: 7 }
       }}>
        <Box>
          <Sobrescrita>Visitar</Sobrescrita>
          <TituloSeccao destaque="encontra">Onde nos</TituloSeccao>
          <Typography color="text.secondary" sx={{ maxWidth: "56ch" }}>
            Estamos em {CASA.localidade}. A marcação online é a forma mais
            rápida de garantir a cadeira à hora que lhe dá jeito.
          </Typography>

          <Box component="ul" sx={{ listStyle: "none", m: 0, mt: 3, p: 0 }}>
            <LinhaContacto rotulo="Morada">
              {/* Sem morada, a ligação procura a casa pelo nome — que no Google
                  Maps resolve. Melhor do que uma linha em branco. */}
              <a href={CASA.mapa} target="_blank" rel="noopener">
                {CASA.morada
                  ? <>{CASA.morada}<br />{CASA.codigoPostal} {CASA.localidade}</>
                  : <>Ver no Google Maps</>}
              </a>
            </LinhaContacto>
            {CASA.telefoneRaw && (
              <LinhaContacto rotulo="Telefone">
                <a href={`tel:${CASA.telefoneRaw}`}>{CASA.telefone}</a>
              </LinhaContacto>
            )}
            <LinhaContacto rotulo="Instagram">
              <a href={CASA.instagram} target="_blank" rel="noopener">@manspace.pt</a>
            </LinhaContacto>
            <LinhaContacto rotulo="Marcações">
              <Link href="/marcar">Marcar online</Link>
            </LinhaContacto>
          </Box>
        </Box>

        <Box>
          <Sobrescrita>Horário</Sobrescrita>
          <Box component="ul" sx={{ listStyle: "none", m: 0, mt: 3, p: 0 }}>
            {ORDEM.map((i) => {
              const h = CASA.horario[i];
              const hoje = new Date().getDay() === i;
              return (
                <Box component="li" key={h.dia} sx={{
                  display: "flex", justifyContent: "space-between", gap: 2,
                  py: 1.4, borderBottom: `1px solid ${comAlfa(cores.acento3, 0.28)}`,
                  color: hoje ? cores.acento3 : "text.primary",
                  fontWeight: hoje ? 500 : 400
                }}>
                  <span>{h.dia}</span>
                  {h.aberto
                    ? <span>{h.abre} – {h.fecha}</span>
                    : <Typography component="span" variant="overline" sx={{ color: cores.texto3 }}>Encerrado</Typography>}
                </Box>
              );
            })}
          </Box>
          <EstadoLoja />
        </Box>
       </Box>

        {/* O mapa a sério, e não só uma ligação: quem procura uma barbearia
            quer ver onde fica antes de decidir sair de casa.

            O `output=embed` do Google Maps não precisa de chave de API — não há
            nada para gerir nem para expirar. Enquanto a morada não chegar, a
            consulta é o nome da casa, que o Maps resolve; quando chegar, muda-se
            `mapaEmbed` em `lib/dados.ts` e mais nada.

            O filtro tira-lhe a saturação de mapa de ecrã e aproxima-o do papel
            do resto da página — o suficiente para não gritar, longe do que
            tornaria as ruas ilegíveis. */}
        <Box sx={{
          mt: { xs: 5, md: 7 },
          position: "relative",
          border: `1px solid ${comAlfa(cores.acento3, 0.35)}`,
          height: { xs: 280, md: 420 },
          bgcolor: cores.fundo2,
          "& iframe": {
            display: "block", width: "100%", height: "100%", border: 0,
            filter: "grayscale(0.45) sepia(0.18) contrast(0.95)"
          }
        }}>
          <Box
            component="iframe"
            src={CASA.mapaEmbed}
            title={`Mapa com a localização do ${CASA.nomeCompleto}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </Box>

        <Box sx={{
          mt: 2, display: "flex", flexWrap: "wrap", gap: 1.5,
          alignItems: "baseline", justifyContent: "space-between"
        }}>
          {/* A avaliação da casa, onde ela pesa: ao lado do mapa, no momento em
              que alguém está a decidir se vale a pena a viagem. */}
          {CASA.estrelas != null && CASA.avaliacoes != null && (
            <Typography variant="body2" sx={{ color: cores.texto3 }}>
              <Box component="span" sx={{ color: cores.acento3, fontWeight: 500 }}>
                {CASA.estrelas.toLocaleString("pt-PT", { minimumFractionDigits: 1 })}
                <Box component="span" aria-hidden sx={{ ml: 0.5 }}>★</Box>
              </Box>
              {" "}· {CASA.avaliacoes} avaliações no Google
            </Typography>
          )}
          <Box component="a" href={CASA.mapa} target="_blank" rel="noopener"
            sx={{
              color: cores.acento3, textDecoration: "none", fontSize: 15,
              ml: "auto",
              "&:hover": { textDecoration: "underline" }
            }}>
            Abrir no Google Maps →
          </Box>
        </Box>
      </Envolve>
    </Box>
  );
}

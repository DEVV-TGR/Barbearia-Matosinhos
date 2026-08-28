import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Envolve from "../Envolve";
import Sobrescrita from "../Sobrescrita";
import TituloSeccao from "../TituloSeccao";
import { CASA } from "@/lib/dados";
import { cores, comAlfa, tituloFonte } from "@/app/design";

/* Do que a casa faz que uma barbearia de bairro não faz. Sai da carta, não da
   imaginação: são os três serviços que justificam o "male concept" do nome. */
const OFICIOS = [
  { nome: "Barbaterapia", nota: "Relaxamento, hidratação e cuidado completo da barba." },
  { nome: "Tratamentos", nota: "Limpeza de pele, hidratação no ozono, higienização." },
  { nome: "Prótese capilar", nota: "Aplicação e adaptação personalizada, feita com tempo." }
];

export default function Casa() {
  return (
    <Box component="section" id="casa" sx={{ py: { xs: 6, md: 12 } }}>
      <Envolve sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: { xs: 5, md: 7 },
        alignItems: "center"
      }}>
        <Box sx={{ order: { xs: 2, md: 1 } }}>
          <Sobrescrita>A Casa</Sobrescrita>
          <TituloSeccao destaque="só para si">Um espaço</TituloSeccao>
          <Typography color="text.secondary" sx={{ maxWidth: "56ch", mb: 2 }}>
            O Man Space é um espaço masculino em {CASA.localidade}: madeira clara,
            luz quente e uma cadeira reservada de cada vez. Não é uma passagem
            rápida pela máquina — é tempo marcado em nome de alguém.
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: "56ch" }}>
            À barbearia juntámos o que normalmente se procura noutro sítio. Daí
            os packs: em vez de somar serviços à conta, faz-se a carta inteira
            de uma vez, numa hora só.
          </Typography>

          <Box component="ul" sx={{ listStyle: "none", m: 0, mt: 4, p: 0 }}>
            {OFICIOS.map((o) => (
              <Box
                component="li"
                key={o.nome}
                sx={{
                  py: 1.6,
                  borderTop: `1px solid ${comAlfa(cores.acento3, 0.28)}`,
                  "&:last-of-type": { borderBottom: `1px solid ${comAlfa(cores.acento3, 0.28)}` }
                }}
              >
                <Typography sx={{
                  fontFamily: tituloFonte.style.fontFamily, fontSize: "1.25rem", fontWeight: 500,
                  textTransform: "uppercase", letterSpacing: "0.05em", lineHeight: 1.1
                }}>
                  {o.nome}
                </Typography>
                <Typography variant="body2" sx={{ color: cores.texto3, mt: 0.4 }}>
                  {o.nota}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{
          order: { xs: 1, md: 2 },
          position: "relative",
          maxWidth: { xs: "24rem", md: "none" },
          width: "100%",
          // A moldura deslocada dá profundidade sem sombra; em ecrãs médios
          // encolhe, para não empurrar a página para fora (transbordava no iPad).
          "&::before": {
            content: '""', position: "absolute",
            inset: {
              xs: "1rem -1rem -1rem 1rem",
              md: "1rem -0.75rem -1rem 1rem",
              lg: "1.4rem -1.4rem -1.4rem 1.4rem"
            },
            border: `1px solid ${comAlfa(cores.acento3, 0.55)}`, zIndex: -1
          }
        }}>
          {/* Aqui vai a placa da casa, não um lugar reservado: é a única
              imagem de marca que existe, e uma moldura vazia neste tamanho
              lia-se como uma imagem que não carregou. As fotografias do espaço
              têm o seu lugar na galeria, onde a ausência se percebe. */}
          {/* Quadrada, como a placa: em 4/5 o `cover` cortava-lhe o "E" de SPACE. */}
          <Box sx={{ position: "relative", aspectRatio: "1", overflow: "hidden" }}>
            <Image
              src="/img/logo.jpg"
              alt={`Placa do ${CASA.nomeCompleto} à entrada do salão`}
              fill
              sizes="(max-width: 900px) 90vw, 45vw"
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Box>
      </Envolve>
    </Box>
  );
}

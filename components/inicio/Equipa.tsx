import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Envolve from "../Envolve";
import Revela from "../Revela";
import Sobrescrita from "../Sobrescrita";
import TituloSeccao from "../TituloSeccao";
import { BARBEIROS } from "@/lib/dados";
import { cardinal } from "@/lib/formatar";
import { cores, comAlfa } from "@/app/design";

export default function Equipa() {
  return (
    <Box component="section" id="equipa" sx={{ py: { xs: 5, md: 12 } }}>
      <Envolve>
        <Sobrescrita>Quem corta</Sobrescrita>
        {/* O número vem da lista. Escrito à mão, seria a primeira coisa a ficar
            errada no dia em que entrar ou sair alguém. */}
        <TituloSeccao destaque="um padrão">{cardinal(BARBEIROS.length)} cadeiras,</TituloSeccao>
        <Typography color="text.secondary" sx={{ maxWidth: "56ch" }}>
          Escolha o seu barbeiro na marcação — ou deixe-nos escolher por si.
        </Typography>

        {/* Duas colunas já no telemóvel: numa coluna só, cada retrato ocupava
            467px — 55% do ecrã — e a secção passava dos dois ecrãs. */}
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: `repeat(${Math.min(BARBEIROS.length, 4)}, 1fr)` },
          gap: { xs: 1.5, md: 2.5 }, mt: { xs: 3.5, md: 5 }
        }}>
          {/* Um a um, e não os quatro ao mesmo tempo: com a secção inteira a
              aparecer de um golpe, quatro retratos iguais lêem-se como uma
              imagem só. O tecto de três impede que o último fique à espera. */}
          {BARBEIROS.map((b, i) => (
            <Revela key={b.id} atraso={Math.min(i, 3) * 90} deslocamento={20}>
            <Box component="article" sx={{ "&:hover img": { transform: "scale(1.04)" } }}>
              <Box sx={{
                position: "relative", aspectRatio: "3 / 4",
                overflow: "hidden", bgcolor: cores.fundo3,
                border: `1px solid ${comAlfa(cores.acento3, 0.25)}`
              }}>
                <Image
                  src={b.foto}
                  alt={`Retrato de ${b.nome}`}
                  fill
                  sizes="(max-width: 900px) 45vw, 24vw"
                  style={{ objectFit: "cover", transition: "transform 900ms cubic-bezier(0.22,1,0.36,1)" }}
                />
                <Box sx={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(180deg, transparent 45%, ${comAlfa(cores.acento, 0.9)})`
                }} />
                {/* O gradiente escuro só cobre o fundo do retrato; aqui em
                    cima o numeral cai sobre madeira clara e sem a sombra
                    desaparecia dentro dela. */}
                <Typography sx={{
                  position: "absolute", top: 14, left: 18, zIndex: 2,
                  color: cores.ouro, fontWeight: 500, fontSize: 13, letterSpacing: "0.16em",
                  textShadow: `0 1px 8px ${comAlfa(cores.acento, 0.85)}`
                }}>
                  0{i + 1}
                </Typography>
                {/* Em coluna estreita só o nome fica sobre a foto: o cargo,
                    com o espaçamento das maiúsculas, partia em três linhas e
                    tapava metade do retrato. */}
                <Box sx={{ position: "absolute", bottom: { xs: 12, md: 18 }, left: { xs: 12, md: 16 }, right: { xs: 12, md: 16 }, zIndex: 2 }}>
                  <Typography variant="h4" component="h3" sx={{
                    fontSize: { xs: "1rem", md: "1.25rem" }, lineHeight: 1.1, color: cores.fundo
                  }}>
                    {b.nome}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="overline" sx={{
                color: cores.acento3, mt: 1.2, letterSpacing: "0.16em", display: "block"
              }}>
                {b.papel}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: { xs: 0.6, md: 1 } }}>{b.bio}</Typography>
            </Box>
            </Revela>
          ))}
        </Box>
      </Envolve>
    </Box>
  );
}

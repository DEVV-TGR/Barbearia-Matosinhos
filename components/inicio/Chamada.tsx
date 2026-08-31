import Box from "@mui/material/Box";
import BotaoLink from "../BotaoLink";
import Typography from "@mui/material/Typography";
import Envolve from "../Envolve";
import TituloSeccao from "../TituloSeccao";
import { cores, comAlfa } from "@/app/design";

/**
 * O último pedido da página, na terceira e última faixa preta.
 *
 * A caixa com esquadria que aqui estava fazia sentido sobre creme, onde era o
 * que distinguia o bloco do fundo. Dentro de uma faixa escura era uma caixa
 * dentro de uma caixa: a faixa já é a moldura.
 */
export default function Chamada() {
  return (
    <Box component="section" sx={{
      py: { xs: 7, md: 12 }, bgcolor: cores.acento, color: cores.fundo,
      borderTop: `1px solid ${comAlfa(cores.ouro, 0.25)}`
    }}>
      <Envolve sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "stretch", md: "center" },
        justifyContent: "space-between",
        gap: { xs: 3.5, md: 5 }
      }}>
        <Box>
          <TituloSeccao destaque="a sua vez" corDestaque={cores.ouro} sx={{ mb: 1 }}>
            Pronto para
          </TituloSeccao>
          <Typography sx={{ color: cores.fundo3, m: 0 }}>
            Quatro passos. Sem chamadas, sem esperas.
          </Typography>
        </Box>
        <BotaoLink href="/marcar" variant="contained" size="large" sx={{
          flex: "none",
          bgcolor: cores.fundo, color: cores.acento,
          "&:hover": { bgcolor: cores.fundo3, color: cores.acento }
        }}>
          Marcar agora
        </BotaoLink>
      </Envolve>
    </Box>
  );
}

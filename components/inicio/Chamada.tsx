import Box from "@mui/material/Box";
import BotaoLink from "../BotaoLink";
import Typography from "@mui/material/Typography";
import Envolve from "../Envolve";
import TituloSeccao from "../TituloSeccao";
import { Esquadria } from "../Marca";
import { cores, comAlfa } from "@/app/design";

export default function Chamada() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Envolve>
        <Esquadria canto={26} sx={{
          bgcolor: cores.fundo2,
          border: `1px solid ${comAlfa(cores.acento3, 0.3)}`,
          p: { xs: 3.5, md: 5 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          justifyContent: "space-between",
          gap: 3
        }}>
          <Box>
            <TituloSeccao destaque="a sua vez" sx={{ mb: 1 }}>Pronto para</TituloSeccao>
            <Typography color="text.secondary" sx={{ m: 0 }}>
              Quatro passos. Sem chamadas, sem esperas.
            </Typography>
          </Box>
          <BotaoLink href="/marcar" variant="contained" size="large" sx={{ flex: "none" }}>
            Marcar agora
          </BotaoLink>
        </Esquadria>
      </Envolve>
    </Box>
  );
}

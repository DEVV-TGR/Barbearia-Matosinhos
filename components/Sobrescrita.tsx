import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { cores, comAlfa } from "@/app/design";

/**
 * Rótulo de secção — a etiqueta preta do poster.
 *
 * No impresso, cada bloco é anunciado por uma placa preta com o nome a dourado,
 * pousada sobre um filete que atravessa a largura toda. É o gesto que identifica
 * a marca à distância, e não custa mais do que o traço e o texto que substitui.
 *
 * Nas faixas escuras a placa inverte-se: preta sobre preto não é placa nenhuma,
 * por isso ali é o dourado que fica por baixo e o preto por cima.
 */
export default function Sobrescrita({
  children, centrado = false, escuro = false
}: { children: React.ReactNode; centrado?: boolean; escuro?: boolean }) {
  const fundoPlaca = escuro ? cores.ouro : cores.acento;
  const corTexto = escuro ? cores.acento : cores.fundo;
  const filete = comAlfa(escuro ? cores.ouro : cores.acento3, escuro ? 0.45 : 0.4);

  return (
    <Box sx={{
      display: "flex", alignItems: "center", gap: 2, mb: 2.5,
      justifyContent: centrado ? "center" : "flex-start"
    }}>
      {centrado && <Box sx={{ flex: 1, height: "1px", bgcolor: filete }} />}

      <Box sx={{
        bgcolor: fundoPlaca,
        px: 2.2, py: 0.9,
        flex: "none"
      }}>
        <Typography variant="overline" component="p" sx={{
          color: corTexto, lineHeight: 1, display: "block"
        }}>
          {children}
        </Typography>
      </Box>

      <Box sx={{ flex: 1, height: "1px", bgcolor: filete }} />
    </Box>
  );
}

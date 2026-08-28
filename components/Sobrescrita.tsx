import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { cores, comAlfa } from "@/app/design";

/**
 * Rótulo de secção — a etiqueta preta do poster.
 *
 * No impresso, cada bloco é anunciado por uma placa preta com o nome a dourado,
 * pousada sobre um filete que atravessa a largura toda. É o gesto que identifica
 * a marca à distância, e não custa mais do que o traço e o texto que substitui.
 */
export default function Sobrescrita({
  children, centrado = false
}: { children: React.ReactNode; centrado?: boolean }) {
  return (
    <Box sx={{
      display: "flex", alignItems: "center", gap: 2, mb: 2.5,
      justifyContent: centrado ? "center" : "flex-start"
    }}>
      {centrado && (
        <Box sx={{ flex: 1, height: "1px", bgcolor: comAlfa(cores.acento3, 0.4) }} />
      )}

      <Box sx={{
        bgcolor: cores.acento,
        px: 2.2, py: 0.9,
        flex: "none"
      }}>
        <Typography variant="overline" component="p" sx={{
          color: cores.fundo, lineHeight: 1, display: "block"
        }}>
          {children}
        </Typography>
      </Box>

      <Box sx={{ flex: 1, height: "1px", bgcolor: comAlfa(cores.acento3, 0.4) }} />
    </Box>
  );
}

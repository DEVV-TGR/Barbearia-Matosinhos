import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { cores } from "@/app/design";

/**
 * Título de secção com uma parte em destaque.
 * `destaque` sai a bronze, como "sua vez" em "Marque a sua vez" — a mesma cor
 * dos preços no poster, e a única que se destaca do preto sem gritar.
 */
export default function TituloSeccao({
  children, destaque, corDestaque = cores.acento3, component = "h2", sx
}: {
  children?: React.ReactNode;
  destaque?: React.ReactNode;
  /** Nas faixas escuras o bronze não se lê: ali o destaque vai a `ouro`. */
  corDestaque?: string;
  component?: React.ElementType;
  sx?: object;
}) {
  return (
    <Typography
      variant="h2"
      component={component}
      sx={{ fontSize: "clamp(2.5rem, 6vw, 4.6rem)", mb: 2, ...sx }}
    >
      {children}
      {destaque != null && (
        <>
          {children ? " " : null}
          <Box component="span" sx={{ color: corDestaque }}>{destaque}</Box>
        </>
      )}
    </Typography>
  );
}

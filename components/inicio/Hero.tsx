import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BotaoLink from "../BotaoLink";
import Envolve from "../Envolve";
import Marca from "../Marca";
import { BARBEIROS, CASA, SERVICOS } from "@/lib/dados";
import { cores, comAlfa, tituloFonte } from "@/app/design";

/* Os números não são escritos à mão. A versão anterior anunciava "3 barbeiros"
   num sítio e listava três noutro, e o dia em que entrasse o quarto ficavam a
   discordar. Aqui vêm todos do mesmo lado de onde vem o resto do site. */
function factos() {
  const precos = SERVICOS.map((s) => s.preco).filter((p) => p > 0);
  const lista: { r: string; v: string }[] = [
    { r: "Barbeiros", v: String(BARBEIROS.length) },
    { r: "Serviços", v: String(SERVICOS.length) },
    { r: "A partir de", v: `${Math.min(...precos)} €` }
  ];
  if (CASA.desde) lista.unshift({ r: "Desde", v: String(CASA.desde) });
  if (CASA.avaliacoes) lista.push({ r: "Avaliações", v: String(CASA.avaliacoes) });
  return lista;
}

export default function Hero() {
  const FACTOS = factos();

  return (
    <Box component="section" sx={{
      minHeight: "100svh", display: "grid", alignItems: "center",
      position: "relative", pt: { xs: 14, md: 16 }, pb: 8, overflow: "hidden",
      bgcolor: cores.fundo
    }}>
      {/* O ripado de madeira da parede da loja, reduzido a duas linhas de
          gradiente. Não é uma textura de stock: é a única coisa que há para ver
          no espaço até as fotografias chegarem, e já estava na marca. */}
      <Box aria-hidden sx={{
        position: "absolute", inset: 0, zIndex: 0, opacity: 0.5,
        backgroundImage: `repeating-linear-gradient(90deg,
          ${comAlfa(cores.acento3, 0.07)} 0 1px,
          transparent 1px 14px)`,
        maskImage: "radial-gradient(120% 90% at 50% 35%, #000 25%, transparent 78%)",
        WebkitMaskImage: "radial-gradient(120% 90% at 50% 35%, #000 25%, transparent 78%)"
      }} />

      <Envolve sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <Marca tamanho="grande" />

        <Box sx={{ maxWidth: "34ch", mx: "auto", mt: { xs: 5, md: 6 } }}>
          <Typography component="p" sx={{
            fontFamily: tituloFonte.style.fontFamily,
            fontSize: "clamp(1.35rem, 3.4vw, 2rem)",
            lineHeight: 1.25, color: cores.texto,
            // Sem isto o lema partia com o "o" sozinho no fim da primeira linha
            textWrap: "balance"
          }}>
            {CASA.lema}
          </Typography>
          {/* A marca é bilingue no impresso. O site é português, mas o lema é a
              assinatura da casa e perde-se se lhe tirarmos metade. */}
          <Typography component="p" lang="en" sx={{
            mt: 1.2, fontStyle: "italic", color: cores.texto3,
            fontSize: "clamp(0.85rem, 1.7vw, 1rem)"
          }}>
            {CASA.lemaEN}
          </Typography>
        </Box>

        <Typography variant="overline" component="p" sx={{ color: cores.acento3, mt: 4 }}>
          Barbearia em {CASA.localidade}
        </Typography>

        {/* Em ecrã estreito os dois não cabiam lado a lado (423px em 393px):
            quebravam de linha e ficavam com larguras diferentes. Aqui dividem
            a largura em partes iguais. */}
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", sm: "auto auto" },
          justifyContent: { sm: "center" },
          gap: 1.2, mt: 3.5,
          "& .MuiButton-root": {
            px: { xs: 1.2, sm: 3.6 },
            py: { xs: 1.1, sm: 1.7 },
            fontSize: { xs: 13, sm: 15 },
            whiteSpace: "nowrap"
          }
        }}>
          <BotaoLink href="/marcar" variant="contained" size="large">
            {/* "Marcar a minha vez" não cabe numa linha em meio ecrã e fazia o
                botão crescer para 77px de altura. */}
            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
              Marcar a minha vez
            </Box>
            <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
              Marcar vez
            </Box>
          </BotaoLink>
          <BotaoLink href="#servicos" variant="outlined" size="large">
            Ver a carta
          </BotaoLink>
        </Box>

        {/* Em telemóvel, grelha 2×2: com flex-wrap os factos partiam 3 + 1 e o
            último ficava sozinho numa linha. */}
        <Box component="dl" sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", sm: `repeat(${FACTOS.length}, auto)` },
          justifyContent: { sm: "center" },
          gap: { xs: "1.4rem 1rem", sm: "3rem" },
          mt: { xs: 6, md: 8 }, pt: 4, mb: 0,
          borderTop: `1px solid ${comAlfa(cores.acento3, 0.28)}`
        }}>
          {FACTOS.map((f) => (
            <Box key={f.r}>
              <Typography component="dt" variant="overline" sx={{ color: cores.texto3, display: "block" }}>
                {f.r}
              </Typography>
              <Typography component="dd" variant="h4" sx={{
                m: 0, color: cores.acento3, fontSize: "1.7rem", letterSpacing: "0.02em"
              }}>
                {f.v}
              </Typography>
            </Box>
          ))}
        </Box>
      </Envolve>
    </Box>
  );
}

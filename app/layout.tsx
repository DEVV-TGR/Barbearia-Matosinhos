import type { Metadata, Viewport } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import tema from "./tema";
import { corpoFonte, cores } from "./design";
import Cabecalho from "@/components/Cabecalho";
import Rodape from "@/components/Rodape";
import TransicaoPagina from "@/components/TransicaoPagina";
import { CASA } from "@/lib/dados";

export const metadata: Metadata = {
  // POR CONFIRMAR: o domínio final. Daqui saem os URLs absolutos das partilhas.
  metadataBase: new URL("https://manspace.vercel.app"),
  title: `${CASA.nomeCompleto} — Barbearia em ${CASA.localidade}`,
  description:
    "Barbearia masculina em Matosinhos. Cortes, barba, tratamentos e prótese capilar. " +
    "Packs de experiência completa. Marque a sua vez online.",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: CASA.nomeCompleto,
    title: `${CASA.nomeCompleto} — ${CASA.localidade}`,
    description: CASA.lema,
    /* Até haver fotografias do espaço, a tabela de preços é a melhor imagem
       para partilhar: mostra a marca e o que se paga, de uma vez. */
    images: ["/img/tabela-precos.jpg"]
  },
  icons: { icon: "/img/logo.jpg" }
};

export const viewport: Viewport = {
  themeColor: cores.fundo,
  viewportFit: "cover"
};

export default function LayoutRaiz({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={corpoFonte.className} suppressHydrationWarning>
      <body>
        {/* Sem JavaScript não há quem tire o loader do caminho nem quem revele
            as secções: o site tem de continuar a ler-se à mesma. */}
        <noscript>
          <style>{
            "[data-carregamento]{display:none!important}" +
            "[data-revela]{opacity:1!important;transform:none!important}" +
            "[data-pagina]{animation:none!important}"
          }</style>
        </noscript>

        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={tema}>
            <CssBaseline />
            <Cabecalho />
            <main id="principal">
              <TransicaoPagina>{children}</TransicaoPagina>
            </main>
            <Rodape />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

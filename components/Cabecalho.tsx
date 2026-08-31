"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Envolve from "./Envolve";
import EstadoLoja from "./EstadoLoja";
import Marca from "./Marca";
import { CASA } from "@/lib/dados";
import { cores, comAlfa, tituloFonte } from "@/app/design";
import { CURVA, TEMPO, escada } from "@/lib/movimento";

const PAGINAS = [
  { rotulo: "Início", href: "/" },
  { rotulo: "Serviços", href: "/#servicos" },
  { rotulo: "Equipa", href: "/#equipa" },
  { rotulo: "Visitar", href: "/#visitar" }
];

function MarcaLigada({ claro }: { claro: boolean }) {
  return (
    <Box
      component={Link}
      href="/"
      aria-label={CASA.nomeCompleto}
      sx={{ textDecoration: "none", color: "inherit", display: "inline-flex" }}
    >
      {/* Sem monograma: na barra, o M por cima do nome faria o cabeçalho ter
          três andares de altura. */}
      <Marca
        tamanho="pequeno"
        monograma={false}
        cor={claro ? cores.fundo : cores.texto}
        corConceito={claro ? cores.ouro : cores.acento3}
      />
    </Box>
  );
}

export default function Cabecalho() {
  const [rolado, setRolado] = useState(false);
  const [aberto, setAberto] = useState(false);
  const tema = useTheme();
  const largo = useMediaQuery(tema.breakpoints.up("md"));
  const caminho = usePathname();

  useEffect(() => {
    const aoRolar = () => setRolado(window.scrollY > 50);
    aoRolar();
    addEventListener("scroll", aoRolar, { passive: true });
    return () => removeEventListener("scroll", aoRolar);
  }, []);

  // Ao passar para ecrã largo o cartão deixa de fazer sentido
  useEffect(() => { if (largo) setAberto(false); }, [largo]);

  const actual = (href: string) => href === "/" ? caminho === "/" : caminho.startsWith(href.replace("/#", "/"));

  /* Antes de rolar, a página inicial tem o hero preto por baixo do cabeçalho, e
     texto escuro sobre preto não é texto nenhum. Só na inicial: `/marcar` e
     `/painel` continuam a abrir em creme. Assim que rola, a barra fica opaca e
     tudo volta às cores de sempre. */
  const claro = !rolado && caminho === "/";

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          // Opaco a sério quando rolado. Antes era 92 % com backdrop-filter, e
          // o Safari no iOS não aplica o desfoque de forma fiável num AppBar
          // fixo: o que passava por baixo lia-se através do cabeçalho.
          bgcolor: rolado ? cores.fundo : "transparent",
          boxShadow: rolado ? `0 1px 0 ${cores.fundo3}` : "none",
          transition: "background 420ms, box-shadow 420ms, padding 420ms",
          py: rolado ? 0.5 : 1.2,
          backgroundImage: "none"
        }}
      >
        <Envolve>
          <Toolbar disableGutters sx={{ justifyContent: "space-between", gap: 2, minHeight: "auto !important" }}>
            <MarcaLigada claro={claro} />

            {largo ? (
              <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                {PAGINAS.map((p) => (
                  <Button
                    key={p.href}
                    component={Link}
                    href={p.href}
                    sx={{
                      color: actual(p.href)
                        ? (claro ? cores.ouro : "primary.main")
                        : (claro ? comAlfa(cores.fundo, 0.82) : "text.secondary"),
                      fontSize: 14, px: 2, py: 1,
                      transition: "color 420ms, background-color 200ms",
                      "&:hover": {
                        color: claro ? cores.fundo : "text.primary",
                        bgcolor: claro ? comAlfa(cores.fundo, 0.12) : cores.fundo3,
                        transform: "none"
                      }
                    }}
                  >
                    {p.rotulo}
                  </Button>
                ))}
                <Button component={Link} href="/marcar" variant="contained" size="small" sx={{
                  ml: 1,
                  ...(claro && {
                    bgcolor: cores.fundo, color: cores.acento,
                    "&:hover": { bgcolor: cores.fundo3, color: cores.acento }
                  })
                }}>
                  Marcar vez
                </Button>
              </Stack>
            ) : (
              <IconButton
                onClick={() => setAberto(true)}
                aria-label="Abrir menu"
                aria-expanded={aberto}
                sx={{
                  color: claro ? cores.fundo : "text.primary",
                  transition: "color 420ms",
                  width: 44, height: 44
                }}
              >
                <Box sx={{ display: "grid", gap: "5px" }}>
                  {[0, 1, 2].map((i) => (
                    <Box key={i} sx={{ width: 22, height: 2, bgcolor: "currentColor", borderRadius: 1 }} />
                  ))}
                </Box>
              </IconButton>
            )}
          </Toolbar>
        </Envolve>
      </AppBar>

      {/* O menu ocupa o ecrã todo. Antes era um cartão ao centro com cantos
          redondos e quatro botões empilhados — lia-se como o diálogo de uma
          aplicação qualquer e não como esta casa. O `Dialog` fica na mesma:
          é ele que prende o foco, trata do Escape e bloqueia o scroll por
          trás, e nada disso valia a pena reimplementar. */}
      <Dialog
        fullScreen
        open={aberto && !largo}
        onClose={() => setAberto(false)}
        aria-label="Navegação"
        transitionDuration={{ enter: TEMPO.curto, exit: TEMPO.micro }}
        slotProps={{
          paper: { sx: { bgcolor: cores.acento, backgroundImage: "none", border: "none" } }
        }}
      >
        {/* A parede da loja por baixo de tudo, quase apagada: dá matéria ao
            preto sem disputar nada com o texto. */}
        <Box aria-hidden sx={{ position: "absolute", inset: 0, opacity: 0.14 }}>
          <Image src="/img/parede-ripado.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
        </Box>

        <Box sx={{
          position: "relative", zIndex: 1,
          minHeight: "100%", display: "flex", flexDirection: "column",
          px: 2.5, pt: 1.6, pb: 3.5,
          color: cores.fundo
        }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Marca tamanho="pequeno" monograma={false} cor={cores.fundo} corConceito={cores.ouro} />
            <IconButton
              onClick={() => setAberto(false)}
              aria-label="Fechar menu"
              sx={{ color: cores.fundo, width: 44, height: 44, mr: -1 }}
            >
              <Box component="svg" viewBox="0 0 24 24" width={22} height={22} fill="none"
                stroke="currentColor" strokeWidth={1.6} aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </Box>
            </IconButton>
          </Box>

          {/* Os destinos, em corpo grande e um por linha. `flex: 1` empurra o
              rodapé para baixo em qualquer altura de ecrã. */}
          <Box component="nav" sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", py: 4 }}>
            {PAGINAS.map((p, i) => (
              <Box
                key={p.href}
                component={Link}
                href={p.href}
                onClick={() => setAberto(false)}
                aria-current={actual(p.href) ? "page" : undefined}
                sx={{
                  display: "flex", alignItems: "baseline", gap: 2,
                  textDecoration: "none",
                  py: 1.6,
                  borderBottom: `1px solid ${comAlfa(cores.ouro, 0.22)}`,
                  "&:first-of-type": { borderTop: `1px solid ${comAlfa(cores.ouro, 0.22)}` },
                  color: actual(p.href) ? cores.ouro : cores.fundo,
                  // Um a um, como as linhas do preçário e os retratos da equipa
                  animation: `linhaEntra ${TEMPO.medio}ms ${CURVA.entrada} ${escada(i, 60, 5)} both`,
                  transition: `color ${TEMPO.curto}ms ${CURVA.suave}`,
                  "&:active": { color: cores.ouro }
                }}
              >
                <Box component="span" aria-hidden sx={{
                  fontSize: 13, letterSpacing: "0.18em", color: comAlfa(cores.ouro, 0.75),
                  fontWeight: 500, minWidth: "2.2rem"
                }}>
                  0{i + 1}
                </Box>
                <Box component="span" sx={{
                  fontFamily: tituloFonte.style.fontFamily,
                  fontSize: "clamp(1.9rem, 9vw, 2.6rem)",
                  textTransform: "uppercase", letterSpacing: "0.05em", lineHeight: 1.05
                }}>
                  {p.rotulo}
                </Box>
              </Box>
            ))}
          </Box>

          <Box>
            <EstadoLoja escuro />
            <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 2, mt: 1.5 }}>
              <Typography variant="body2" sx={{ color: cores.fundo3 }}>
                {CASA.morada}, {CASA.localidade}
              </Typography>
              <Box
                component="a"
                href={CASA.instagram}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: cores.ouro, textDecoration: "none", fontSize: 13,
                  letterSpacing: "0.14em", textTransform: "uppercase", whiteSpace: "nowrap"
                }}
              >
                Instagram
              </Box>
            </Box>
            <Button
              component={Link}
              href="/marcar"
              onClick={() => setAberto(false)}
              fullWidth
              sx={{
                mt: 2.5, py: 1.8,
                bgcolor: cores.fundo, color: cores.acento,
                "&:hover": { bgcolor: cores.fundo3, color: cores.acento, transform: "none" }
              }}
            >
              Marcar vez
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

"use client";

/* ==========================================================================
   Tema — traduz o sistema visual da casa para o MUI.
   O MUI traz consigo o aspecto Material; aqui ele é desfeito de propósito:
   cantos quase rectos, sem sombras de elevação, serifa nos títulos.

   O sistema não foi inventado: está no poster de preços da loja. Creme por
   baixo, filete fino a separar, etiqueta preta a anunciar cada bloco e o preço
   grande a bronze. O que este ficheiro faz é obrigar o Material a comportar-se
   como papel impresso.
   ========================================================================== */

import { createTheme } from "@mui/material/styles";
import { cores, corpoFonte, tituloFonte, TEXTO_MINIMO as MINIMO } from "./design";
import { CURVA, TEMPO } from "@/lib/movimento";

const tema = createTheme({
  cssVariables: true,

  /* As curvas do MUI são as do Material. Substituídas pelas da casa, para que
     tudo o que o MUI anima por dentro (Collapse, Dialog, Fade) use o mesmo
     movimento que o resto do site. */
  transitions: {
    easing: {
      easeInOut: CURVA.suave,
      easeOut: CURVA.entrada,
      easeIn: CURVA.saida,
      sharp: CURVA.painel
    },
    duration: {
      shortest: 140,
      shorter: TEMPO.micro,
      short: TEMPO.curto,
      standard: 300,
      complex: TEMPO.medio,
      enteringScreen: TEMPO.curto,
      leavingScreen: 200
    }
  },

  palette: {
    mode: "light",
    /* `light` e `dark` invertem-se em relação ao tema anterior: sobre creme, o
       hover de um botão preto tem de escurecer — clarear aproximava-o do fundo.
       É `dark` que o MUI usa no hover do preenchido. */
    primary:   { main: cores.acento, light: cores.acento3, dark: cores.acento2, contrastText: cores.fundo },
    secondary: { main: cores.texto, contrastText: cores.fundo },
    background: { default: cores.fundo, paper: cores.fundo2 },
    text:      { primary: cores.texto, secondary: cores.texto2, disabled: cores.texto3 },
    error:     { main: cores.erro },
    success:   { main: cores.ok },
    divider:   cores.fundo3
  },

  /* Dois pixéis, não catorze: o arredondado do Material dá um ar de aplicação,
     e isto é um impresso. */
  shape: { borderRadius: 2 },

  typography: {
    fontFamily: corpoFonte.style.fontFamily,
    htmlFontSize: 16,
    fontSize: 16,
    /* A condensada anterior pedia tracking negativo para não desfiar. A serifa
       pede o contrário: o wordmark da casa é "M A N  S P A C E", e é o espaço
       entre as letras que o faz parecer caro. Nenhum título desce de 0.04em. */
    h1: { fontFamily: tituloFonte.style.fontFamily, fontWeight: 400, lineHeight: 0.95,
          textTransform: "uppercase", letterSpacing: "0.05em" },
    h2: { fontFamily: tituloFonte.style.fontFamily, fontWeight: 400, lineHeight: 1.05,
          textTransform: "uppercase", letterSpacing: "0.045em" },
    h3: { fontFamily: tituloFonte.style.fontFamily, fontWeight: 400, lineHeight: 1.1,
          textTransform: "uppercase", letterSpacing: "0.04em" },
    h4: { fontFamily: tituloFonte.style.fontFamily, fontWeight: 500, lineHeight: 1.15,
          textTransform: "uppercase", letterSpacing: "0.04em" },
    h5: { fontFamily: tituloFonte.style.fontFamily, fontWeight: 500,
          textTransform: "uppercase", letterSpacing: "0.04em" },
    h6: { fontFamily: tituloFonte.style.fontFamily, fontWeight: 500,
          textTransform: "uppercase", letterSpacing: "0.04em" },
    /* A Jost é geométrica e de olho pequeno: a 1.65 as linhas colavam-se. */
    body1: { fontSize: 17, fontWeight: 400, lineHeight: 1.72 },
    body2: { fontSize: 15, fontWeight: 400, lineHeight: 1.68 },
    button: { fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", fontSize: 13 },
    // Rótulos: pequenos, mas nunca abaixo do mínimo
    overline: { fontSize: MINIMO + 1, fontWeight: 500, letterSpacing: "0.3em",
                textTransform: "uppercase", lineHeight: 1.6 },
    caption: { fontSize: MINIMO + 1, fontWeight: 400, lineHeight: 1.55 }
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "html, body": { overflowX: "clip" },

        /* Os keyframes vivem aqui e não em cada componente: assim são
           declarados uma vez e qualquer parte do site lhes pode chamar o nome. */
        "@keyframes girar": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" }
        },
        "@keyframes pulsar": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.045)" }
        },
        "@keyframes respirar": {
          "0%, 100%": { opacity: 0.55, transform: "scale(0.94)" },
          "50%": { opacity: 1, transform: "scale(1.06)" }
        },
        "@keyframes emblemaEntra": {
          from: { opacity: 0, transform: "scale(0.86)" },
          to: { opacity: 1, transform: "scale(1)" }
        },
        "@keyframes paginaEntra": {
          from: { opacity: 0, transform: "translate3d(0, 14px, 0)" },
          to: { opacity: 1, transform: "none" }
        },
        "@keyframes linhaEntra": {
          from: { opacity: 0, transform: "translate3d(0, 10px, 0)" },
          to: { opacity: 1, transform: "none" }
        },
        /* O hero. Um avanço lento e sem fim sobre a fotografia: o ecrã nunca
           está parado, mas também nunca se apanha a mexer. */
        "@keyframes aproximar": {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.07)" }
        },

        /* Quem pede menos movimento leva o site inteiro sem ele — incluindo o
           que o MUI anima por dentro. O loader continua a funcionar; apenas
           deixa de girar. */
        "@media (prefers-reduced-motion: reduce)": {
          "*, *::before, *::after": {
            animationDuration: "0.01ms !important",
            animationIterationCount: "1 !important",
            transitionDuration: "0.01ms !important",
            scrollBehavior: "auto !important"
          }
        },

        /* Saltar para uma âncora não pode deixar o título debaixo do
           cabeçalho fixo: 54px de cabeçalho mais folga. */
        "[id]": { scrollMarginTop: "88px" },
        /* Grão sobre tudo, para as superfícies grandes não ficarem lisas demais.
           Sobre creme entra a metade do valor que tinha sobre verde-escuro: a
           mesma opacidade que ali era textura, aqui lê-se como papel sujo. */
        "body::after": {
          content: '""',
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          pointerEvents: "none",
          opacity: 0.016,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")"
        },
        "::selection": { background: cores.acento, color: cores.fundo }
      }
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 2,
          padding: "0.85rem 2rem",
          borderWidth: 2,
          "&:hover": { borderWidth: 2, transform: "translateY(-2px)" },
          "&:active": { transform: "translateY(0)" },
          transition: "background 200ms, color 200ms, border-color 200ms, transform 200ms"
        },
        // 44px é o alvo de toque mínimo recomendado: os pequenos não descem daí
        sizeSmall: { padding: "0.6rem 1.15rem", fontSize: 13, minHeight: 44 },
        // O `large` do MUI subia a letra para 17px e inflava o botão até 57px
        sizeLarge: { padding: "0.85rem 1.8rem", fontSize: 15 }
      },
      // Desactivado tem de continuar a ler-se: 5.0:1, não uma opacidade cega
      variants: [
        {
          props: { variant: "contained" as const },
          style: {
            // Sem esta borda invisível, um preenchido ao lado de um de
            // contorno fica 4px mais baixo — a borda do outro conta na caixa.
            borderStyle: "solid",
            borderColor: "transparent",
            "&.Mui-disabled": { background: cores.fundo3, color: cores.texto2 }
          }
        },
        {
          props: { variant: "outlined" as const },
          style: { "&.Mui-disabled": { borderColor: cores.fundo4, color: cores.texto2 } }
        }
      ]
    },

    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundImage: "none", border: `1px solid ${cores.fundo3}` }
      }
    },

    /* O `AppBar` é um `Paper`, e por isso herdava a borda de cima: um fio creme
       a contornar a barra inteira. Sobre creme nunca se viu; sobre o hero preto
       desenhava uma caixa à volta do cabeçalho. A borda fica onde faz falta —
       cartões do painel, `Paper` de `/marcar`, grupos do preçário — e sai só
       daqui. */
    MuiAppBar: {
      styleOverrides: { root: { border: "none" } }
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2, fontWeight: 500, letterSpacing: "0.12em",
          transition: `background-color ${TEMPO.curto}ms ${CURVA.suave}, color ${TEMPO.curto}ms ${CURVA.suave}, transform ${TEMPO.curto}ms ${CURVA.suave}`
        },
        label: { fontSize: MINIMO + 1 }
      }
    },

    MuiTextField: { defaultProps: { variant: "outlined", fullWidth: true } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 12, background: cores.fundo },
        input: { fontSize: 16 } // abaixo de 16px o iOS dá zoom ao focar
      }
    },
    MuiInputLabel: {
      styleOverrides: { root: { fontSize: 14, fontWeight: 600, letterSpacing: "0.08em" } }
    },

    MuiTooltip: { styleOverrides: { tooltip: { fontSize: MINIMO + 1 } } },

    MuiAccordion: {
      defaultProps: {
        disableGutters: true,
        // Conteúdo sempre montado: desmontado, o primeiro fecho parte de altura
        // zero e a animação salta. Quem precisar de outra duração dá-a no sítio.
        slotProps: { transition: { timeout: TEMPO.painel, unmountOnExit: false } }
      },
      styleOverrides: {
        root: {
          background: "transparent",
          "&:before": { display: "none" },
          // O MUI anima a margem com a curva dele; esta acompanha o painel
          transition: `margin ${TEMPO.painel}ms ${CURVA.painel}`
        }
      }
    },

    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          transition: `opacity ${TEMPO.curto}ms ${CURVA.suave}`,
          "&:hover .MuiAccordionSummary-expandIconWrapper": { opacity: 1 }
        },
        content: { transition: `margin ${TEMPO.painel}ms ${CURVA.painel}` },
        expandIconWrapper: {
          opacity: 0.75,
          // Meia volta em vez do 180° seco do MUI, na curva do painel
          transition: `transform ${TEMPO.painel}ms ${CURVA.painel}, opacity ${TEMPO.curto}ms ${CURVA.suave}`
        }
      }
    },

    MuiIconButton: {
      styleOverrides: {
        root: { transition: `background-color ${TEMPO.curto}ms ${CURVA.suave}, color ${TEMPO.curto}ms ${CURVA.suave}, transform ${TEMPO.curto}ms ${CURVA.suave}` }
      }
    }
  }
});

export default tema;

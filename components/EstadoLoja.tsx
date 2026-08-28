"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { estaAbertoAgora } from "@/lib/marcacoes";
import { cores, comAlfa } from "@/app/design";

/**
 * Depende da hora actual, que difere entre servidor e cliente — por isso só
 * aparece depois de montar, evitando o aviso de hidratação.
 */
export default function EstadoLoja() {
  const [estado, setEstado] = useState<{ aberto: boolean; motivo: string } | null>(null);

  useEffect(() => {
    const ver = () => setEstado(estaAbertoAgora());
    ver();
    const t = setInterval(ver, 60_000);
    return () => clearInterval(t);
  }, []);

  if (!estado) return null;

  return (
    <Box sx={{
      display: "inline-flex", alignItems: "center", gap: 0.8, mt: 2,
      px: 1.6, py: 0.7, borderRadius: 2, fontSize: 13, fontWeight: 600,
      letterSpacing: "0.1em", textTransform: "uppercase",
      border: `1px solid ${estado.aberto ? cores.acento3 : cores.fundo4}`,
      color: estado.aberto ? "primary.main" : cores.texto3
    }}>
      <Box sx={{
        width: 8, height: 8, borderRadius: "50%",
        bgcolor: estado.aberto ? cores.ok : cores.texto3,
        /* O nome tem de ser próprio. Um `@keyframes` declarado dentro de `sx`
           não fica confinado ao componente: o Emotion escreve-o na folha de
           estilos global, e este chamava-se `pulsar` — o mesmo nome dos
           keyframes de escala que o tema declara e que o emblema do ecrã de
           carregamento usa. O último a ser escrito ganhava, e o emblema
           aparecia com a auréola verde deste ponto à volta: num quadrado de
           96px sem cantos redondos, um quadrado verde a piscar no arranque. */
        animation: estado.aberto ? "pulsarPonto 2.4s infinite" : "none",
        "@keyframes pulsarPonto": {
          "0%":   { boxShadow: `0 0 0 0 ${comAlfa(cores.ok, 0.55)}` },
          "70%":  { boxShadow: `0 0 0 8px ${comAlfa(cores.ok, 0)}` },
          "100%": { boxShadow: `0 0 0 0 ${comAlfa(cores.ok, 0)}` }
        }
      }} />
      {estado.aberto ? estado.motivo : `Fechado · ${estado.motivo}`}
    </Box>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Assistente from "@/components/marcar/Assistente";
import { CASA } from "@/lib/dados";

export const metadata: Metadata = {
  title: `Marcar a minha vez — ${CASA.nome}`,
  description:
    `Marque o seu corte, barba ou pack no ${CASA.nome}, em ${CASA.localidade}. ` +
    "Quatro passos, sem chamadas."
};

export default function PaginaMarcar() {
  // O assistente lê `?servico=` com useSearchParams, que exige uma fronteira
  // de suspensão para o Next poder gerar a página estaticamente.
  return (
    <Suspense fallback={<Box sx={{ minHeight: "100svh" }} />}>
      <Assistente />
    </Suspense>
  );
}

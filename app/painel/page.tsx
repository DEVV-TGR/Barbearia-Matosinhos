import type { Metadata } from "next";
import Painel from "@/components/painel/Painel";
import { CASA } from "@/lib/dados";

export const metadata: Metadata = {
  title: `Painel — ${CASA.nome}`,
  description: `Painel interno do ${CASA.nome}: agenda do dia, marcações por barbeiro.`,
  robots: { index: false, follow: false }
};

export default function PaginaPainel() {
  return <Painel />;
}

import Hero from "@/components/inicio/Hero";
import Casa from "@/components/inicio/Casa";
import Experiencias from "@/components/inicio/Experiencias";
import Precario from "@/components/inicio/Precario";
import Equipa from "@/components/inicio/Equipa";
import Testemunhos from "@/components/inicio/Testemunhos";
import Galeria from "@/components/inicio/Galeria";
import Chamada from "@/components/inicio/Chamada";
import Visitar from "@/components/inicio/Visitar";
import Lema from "@/components/Lema";
import Revela from "@/components/Revela";
import { TESTEMUNHOS } from "@/lib/dados";
import { cores } from "@/app/design";
import type { Viewport } from "next";

/* A barra do browser acompanha o topo da página, e o topo desta é o palco
   escuro do hero. As outras rotas ficam com o creme do `layout.tsx`: só esta
   abre em preto. */
export const viewport: Viewport = { themeColor: cores.acento };

export default function Inicio() {
  return (
    <>
      {/* O hero já está no ecrã quando a página abre: revelá-lo seria escondê-lo
          a quem acabou de chegar. */}
      <Hero />

      <Revela><Casa /></Revela>
      <Revela><Experiencias /></Revela>
      <Revela><Precario /></Revela>
      {/* Sem `Revela`: sangra até à borda e tem o seu próprio deslocamento ao
          rolar — dois movimentos em cima um do outro davam um solavanco. */}
      <Lema />
      <Revela><Equipa /></Revela>
      {/* Só entra quando houver avaliações verdadeiras. O `Revela` fica de fora
          da condição de propósito: um invólucro vazio continuava a contar como
          secção para quem conta secções, e mediria a página errada. */}
      {TESTEMUNHOS.length > 0 && <Revela><Testemunhos /></Revela>}
      <Revela><Galeria /></Revela>
      <Revela><Chamada /></Revela>
      <Revela><Visitar /></Revela>
    </>
  );
}

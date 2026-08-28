import Hero from "@/components/inicio/Hero";
import Casa from "@/components/inicio/Casa";
import Experiencias from "@/components/inicio/Experiencias";
import Carta from "@/components/inicio/Carta";
import Equipa from "@/components/inicio/Equipa";
import Testemunhos from "@/components/inicio/Testemunhos";
import Galeria from "@/components/inicio/Galeria";
import Chamada from "@/components/inicio/Chamada";
import Visitar from "@/components/inicio/Visitar";
import Revela from "@/components/Revela";
import { TESTEMUNHOS } from "@/lib/dados";

export default function Inicio() {
  return (
    <>
      {/* O hero já está no ecrã quando a página abre: revelá-lo seria escondê-lo
          a quem acabou de chegar. */}
      <Hero />

      <Revela><Casa /></Revela>
      <Revela><Experiencias /></Revela>
      <Revela><Carta /></Revela>
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

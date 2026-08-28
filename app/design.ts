/* Fontes da casa e reexportação da paleta.
   Sem "use client": é importado tanto por componentes de servidor como de
   cliente. Se as fontes vivessem dentro do tema (que é cliente), o servidor
   receberia apenas uma referência e `tituloFonte.style` chegaria vazio. */

import { Cormorant_Garamond, Jost } from "next/font/google";

export { cores, TEXTO_MINIMO, comAlfa } from "@/lib/cores";

/* O wordmark do Man Space é uma serifa de alto contraste, de hastes finas e
   serifas rectas. A Cormorant Garamond é a mais próxima disso no que há livre —
   e, ao contrário da Playfair, não engorda quando cresce. */
export const tituloFonte = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap"
});

/* A Jost em maiúsculas muito espaçadas dá o "MALE CONCEPT" do logo. É a mesma
   letra que assina os rótulos e a mesma que se lê no corpo do texto. */
export const corpoFonte = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap"
});

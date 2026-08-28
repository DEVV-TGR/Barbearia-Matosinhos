/** Apresentação de preços e durações, igual em todo o lado. */

import type { Servico } from "./dados";

export const euros = (v: number): string => (v === 0 ? "Sob orçamento" : `${v} €`);

/**
 * O preço de um serviço tal como se anuncia.
 *
 * Sete dos serviços da casa — madeixas, platinado, as próteses — têm um preço
 * que é um mínimo, não um valor fechado: depende do cabelo. Escrever "400 €"
 * ao lado da prótese seria prometer o que a casa não pode cumprir, e escrever
 * "desde" à mão em cada sítio garantia que um deles ficaria esquecido.
 */
export const preco = (s: Pick<Servico, "preco" | "desde">): string =>
  s.desde ? `desde ${euros(s.preco)}` : euros(s.preco);

export const duracao = (m: number): string =>
  m >= 60
    ? m % 60 === 0
      ? `${m / 60} h`
      : `${Math.floor(m / 60)} h ${m % 60} min`
    : `${m} min`;

const POR_EXTENSO: Record<number, string> = {
  25: "Vinte e cinco", 26: "Vinte e seis", 27: "Vinte e sete", 28: "Vinte e oito",
  29: "Vinte e nove", 30: "Trinta", 31: "Trinta e um", 32: "Trinta e dois",
  33: "Trinta e três", 34: "Trinta e quatro", 35: "Trinta e cinco"
};

export const anosPorExtenso = (n: number): string => POR_EXTENSO[n] ?? String(n);

const CARDINAIS: Record<number, string> = {
  1: "Uma", 2: "Duas", 3: "Três", 4: "Quatro", 5: "Cinco",
  6: "Seis", 7: "Sete", 8: "Oito", 9: "Nove", 10: "Dez"
};

/** Números pequenos escritos por extenso, para os títulos.
    Escrever "Quatro cadeiras" à mão era como o site anterior anunciava três
    barbeiros e listava outro número. */
export const cardinal = (n: number): string => CARDINAIS[n] ?? String(n);

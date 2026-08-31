/* Paleta da casa. Sem dependências: é importada pelo tema, pelos componentes e
   pelos testes de contraste, que correm fora do Next.

   Vem do poster de preços do Man Space: creme, dourado e etiquetas pretas. Os
   papéis não são os mesmos que numa paleta escura. Ali o dourado podia ser ao
   mesmo tempo o ornamento e a cor dos botões; sobre creme não pode — nenhum
   dourado que ainda pareça dourado chega aos 4.5:1 de que o texto precisa. Por
   isso a cor de acção é o preto da placa da parede, e o bronze fica reservado a
   preços, numerais e filetes, onde é grande o suficiente para se ler. */

export const cores = {
  fundo: "#F4EBDE",
  fundo2: "#EBE0D0",
  fundo3: "#E1D5C2",
  fundo4: "#C9B99F",
  /** Preto tostado — botões e etiquetas. É a cor da placa sobre a madeira. */
  acento: "#171310",
  /** Em fundo claro o hover escurece; clarear afastaria do fundo, não do resto. */
  acento2: "#332A22",
  /** Bronze. Preços, numerais, versaletes e filetes — nunca texto corrido. */
  acento3: "#6B5028",
  /* O dourado da placa, para as faixas escuras. É a mesma cor do bronze vista
     com a luz por trás: sobre o preto dá 7.8:1, sobre o creme dá 2.0:1. Só
     serve num lado, e o teste de contraste guarda os dois sentidos. */
  ouro: "#C8A55E",
  texto: "#241C14",
  texto2: "#5B4B3C",
  texto3: "#695949",
  erro: "#A3301E",
  ok: "#2F6B41"
} as const;

/* A escala mínima de texto. A versão anterior tinha rótulos a 8.6px e 9.3px —
   ilegíveis no telemóvel, e a verdadeira causa da queixa sobre resoluções. */
export const TEXTO_MINIMO = 12;

/**
 * A mesma cor, com transparência.
 *
 * Sem isto, cada componente escrevia `rgba(242, 183, 5, 0.12)` à mão e a paleta
 * ficava espalhada por vinte ficheiros — mudar de cliente obrigava a caçar
 * literais. Aqui a cor continua a vir de um sítio só.
 */
export function comAlfa(hex: string, alfa: number): string {
  const [r, g, b] = hex.replace("#", "").match(/../g)!.map((h) => parseInt(h, 16));
  return `rgba(${r}, ${g}, ${b}, ${alfa})`;
}

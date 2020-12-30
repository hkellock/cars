/** Given the matrix m =
 * [
 *   [a, b], // m[0]
 *   [c, d],
 *   [e, f],
 * ];
 * outputs the transpose matrix t =
 * [
 *   [a, c, e],
 *   [b, d, f],
 * ];
 */
export const transpose = <T>(m: T[][]): T[][] =>
  m[0].map((_, columnIndex) => m.map((row) => row[columnIndex]));

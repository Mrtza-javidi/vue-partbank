export function convertToFarsiNumber(
  number: number | string,
  options: Intl.NumberFormatOptions = {}
) {
  return new Intl.NumberFormat("fa-IR", options).format(Number(number));
}

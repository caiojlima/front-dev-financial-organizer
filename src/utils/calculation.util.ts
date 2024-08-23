export class CalculationHelper {
  public static readonly formatValue = (valor: string) => {
    const number = parseFloat(valor.replace('R$', '').replace(',', '.'));
    const formatedValue =
      number < 0
        ? `-R$${Math.abs(number).toFixed(2).replace('.', ',')}`
        : `R$${number.toFixed(2).replace('.', ',')}`;
    return formatedValue;
  };
}

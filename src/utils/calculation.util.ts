export class CalculationHelper {
  public static readonly formatValue = (valor: string | number) => {
    if (typeof valor === 'number') {
      valor = valor.toString();
    }
    const number = parseFloat(valor.replace('R$', '').replace(',', '.'));
    const formatedValue =
      number < 0
        ? `-R$${Math.abs(number).toFixed(2).replace('.', ',')}`
        : `R$${number.toFixed(2).replace('.', ',')}`;
    return formatedValue;
  };
}

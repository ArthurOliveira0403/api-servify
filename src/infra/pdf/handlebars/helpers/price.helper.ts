import Handlebars from 'handlebars';

export function handlebarsPriceHelper() {
  Handlebars.registerHelper('price', (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price / 100);
  });
}

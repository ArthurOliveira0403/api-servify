import Handlebars from 'handlebars';

export function handlebarsDateHelper() {
  Handlebars.registerHelper('date', (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
  });
}

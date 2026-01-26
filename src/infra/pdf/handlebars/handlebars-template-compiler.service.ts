import { Injectable } from '@nestjs/common';
import { PdfServiceDTO } from 'src/application/services/pdf.service';
import Handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs';
import { handlebarsDateHelper } from './helpers/date.helper';
import { handlebarsPriceHelper } from './helpers/price.helper';

@Injectable()
export class HandlebarsTemplateCompilerService {
  constructor() {
    handlebarsDateHelper();
    handlebarsPriceHelper();
  }

  handle(template: string, data: PdfServiceDTO): string {
    const templatePath = path.resolve(
      __dirname,
      './',
      'templates',
      `${template}.hbs`,
    );

    const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

    const compile = Handlebars.compile(htmlTemplate);

    const html = compile(data);

    return html;
  }
}

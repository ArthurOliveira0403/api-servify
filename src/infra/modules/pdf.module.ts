import { Module } from '@nestjs/common';
import { PupperteertPdfService } from '../pdf/pupperteer/pupperteer-pdf.service';
import { PDF_SERVICE } from 'src/application/services/pdf.service';
import { HandlebarsTemplateCompilerService } from '../pdf/handlebars/handlebars-template-compiler.service';

@Module({
  providers: [
    HandlebarsTemplateCompilerService,
    { provide: PDF_SERVICE, useClass: PupperteertPdfService },
  ],
  exports: [PDF_SERVICE],
})
export class PdfModule {}

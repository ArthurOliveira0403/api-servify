import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GenerateInvoicePdfUseCase } from 'src/application/use-cases/generate-invoice-pdf.use-case';
import { IssueInvoiceUseCase } from 'src/application/use-cases/issue-invoice.use-case';
import { CurrentCompanyUser } from 'src/infra/decorators/current-company-user.decorator';
import { Zod } from 'src/infra/decorators/zod-decorator';
import { JwtAuthCompanyGuard } from 'src/infra/jwt/guards/jwt-auth-company.guard';
import {
  type GenerateInvoicePdfParamDTO,
  generateInvoicePdfParamSchema,
} from 'src/infra/schemas/generate-invoice-pdf.schemas';
import {
  type IssueInvoiceParamDTO,
  issueInvoiceParamSchema,
} from 'src/infra/schemas/issue-invoice.schemas';
import type { FastifyReply } from 'fastify';
import { ReturnCompanyUser } from 'src/infra/jwt/strategies/returns-jwt-strategy';
import { Timezone } from 'src/infra/decorators/timezone.decorator';

@Controller('invoice')
export class InvoiceController {
  constructor(
    private issueInvoiceUseCase: IssueInvoiceUseCase,
    private generateInvoicePdfUseCase: GenerateInvoicePdfUseCase,
  ) {}

  @Post(':id/issue')
  @UseGuards(JwtAuthCompanyGuard)
  async issueInvoice(
    @Param('id', Zod(issueInvoiceParamSchema))
    id: IssueInvoiceParamDTO,
    @CurrentCompanyUser() user: ReturnCompanyUser,
    @Timezone() timezone: string,
  ) {
    if (!timezone) throw new BadRequestException('Timezone not informed');

    const { invoiceId } = await this.issueInvoiceUseCase.handle({
      companyId: user.id,
      serviceExecutionId: id,
      timezone,
    });

    return {
      message: 'Invoice successfully created',
      invoiceId,
    };
  }

  @Get(':id/pdf')
  @UseGuards(JwtAuthCompanyGuard)
  async generatePdf(
    @Param('id', Zod(generateInvoicePdfParamSchema))
    id: GenerateInvoicePdfParamDTO,
    @CurrentCompanyUser() user: ReturnCompanyUser,
    @Res() res: FastifyReply,
  ) {
    const pdf = await this.generateInvoicePdfUseCase.handle({
      companyCnpj: user.cnpj,
      invoiceId: id,
    });

    res
      .header('Content-Type', 'application/pdf')
      .header('Content-Disposition', 'inline; filename="nota-servico.pdf"')
      .send(pdf);
  }
}

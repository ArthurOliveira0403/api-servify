import { Module } from '@nestjs/common';
import { DayjsService } from '../dayjs/dayjs.service';
import { DATE_TRANSFORM } from 'src/application/services/date-transform.service';

@Module({
  providers: [{ provide: DATE_TRANSFORM, useClass: DayjsService }],
  exports: [DATE_TRANSFORM],
})
export class DateTrasnformModule {}

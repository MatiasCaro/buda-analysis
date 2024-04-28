import { Module } from '@nestjs/common';
import { BudaService } from './buda.service';
import { BudaController } from './buda.controller';

@Module({
  providers: [BudaService],
  controllers: [BudaController]
})
export class BudaModule {}

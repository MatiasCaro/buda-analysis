import { Controller, Get } from '@nestjs/common';
import { BudaService } from './buda.service';

@Controller('buda')
export class BudaController {
  constructor(private readonly budaService: BudaService) {}

  @Get('/total-traded-black-buda')
  getTotalTradedDuringBlackBuda() {
    return this.budaService.getTotalTradedDuringBlackBuda();
  }

  @Get('/percentage-increase-in-volume')
  async getPercentageIncreaseInVolume() {
    const increase = await this.budaService.getPercentageIncreaseInVolume();
    return { message: `El porcentaje de incremento de BTC en comparacion al año pasado es ${increase}.` };
  }

  @Get('/lost-commission-black-buda')
  getLostCommissionDuringBlackBuda() {
    return this.budaService.getLostCommissionDuringBlackBuda();
  }
}

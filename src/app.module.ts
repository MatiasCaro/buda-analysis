import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BudaModule } from './buda/buda.module';

@Module({
  imports: [BudaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

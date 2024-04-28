import { Test, TestingModule } from '@nestjs/testing';
import { BudaController } from './buda.controller';

describe('BudaController', () => {
  let controller: BudaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudaController],
    }).compile();

    controller = module.get<BudaController>(BudaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AdminApiController } from './admin-api.controller';

describe('AdminApiController', () => {
  let controller: AdminApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminApiController],
    }).compile();

    controller = module.get<AdminApiController>(AdminApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

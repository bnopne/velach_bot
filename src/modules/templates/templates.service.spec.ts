import { join } from 'path';

import { Test, TestingModule } from '@nestjs/testing';

import { TemplatesService } from './templates.service';

describe('BotService', () => {
  let service: TemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplatesService],
    }).compile();

    service = module.get<TemplatesService>(TemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('loads template and returns it', async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs/promises');
    const fn = jest.spyOn(fs, 'readFile');

    const template = await service.loadTemplate(
      join(__dirname, '__test-data__', 'test-template.mustache'),
    );

    expect(fn).toBeCalled();
    expect(template.trim()).toBe('Test template renders {{testValue}}');
  });

  it.only('caches already read template and doesnt read from disk twice', async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs/promises');
    const fn = jest.spyOn(fs, 'readFile');

    await service.loadTemplate(
      join(__dirname, '__test-data__', 'test-template.mustache'),
    );

    await service.loadTemplate(
      join(__dirname, '__test-data__', 'test-template.mustache'),
    );

    expect(fn).toBeCalledTimes(1);
  });

  it('throws if invalid path is given', async () => {
    expect(
      service.loadTemplate(
        join(__dirname, '__test-data__', 'invalid.mustache'),
      ),
    ).rejects.toHaveProperty('code', 'ENOENT');
  });
});

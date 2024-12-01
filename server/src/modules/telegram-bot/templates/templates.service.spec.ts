import { join } from 'path';

import { TemplatesService } from './templates.service';
import { getTestingModule } from 'src/common/utils/test-utils';

describe('Test TemplatesService', () => {
  let service: TemplatesService;

  beforeEach(async () => {
    const module = await getTestingModule([TemplatesService]);
    service = module.get<TemplatesService>(TemplatesService);
  });

  test('loadTemplate() loads template and returns it', async () => {
    const template = await service.loadTemplate(
      join(__dirname, '__test-data__', 'test-template.mustache'),
    );

    expect(template.trim()).toBe('Test template renders {{testValue}}');
  });

  it('loadTemplate() reads template from disk only on first call and returns cached template on consequent calls', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs/promises');
    const fn = jest.spyOn(fs, 'readFile');

    const template1 = await service.loadTemplate(
      join(__dirname, '__test-data__', 'test-template.mustache'),
    );

    const template2 = await service.loadTemplate(
      join(__dirname, '__test-data__', 'test-template.mustache'),
    );

    expect(fn).toBeCalledTimes(1);
    expect(template1.trim()).toBe('Test template renders {{testValue}}');
    expect(template2.trim()).toBe('Test template renders {{testValue}}');
  });

  test('loadTemplate() throws error if invalid path is given', async () => {
    expect(
      service.loadTemplate(
        join(__dirname, '__test-data__', 'invalid.mustache'),
      ),
    ).rejects.toHaveProperty('code', 'ENOENT');
  });

  test('renderTemplate() returns rendered template string rendered with given context', async () => {
    const text = await service.renderTemplate(
      join(__dirname, '__test-data__', 'test-template.mustache'),
      { testValue: 'gachi' },
    );

    expect(text.trim()).toBe('Test template renders gachi');
  });
});

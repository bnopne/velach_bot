import { getTestingModule } from 'src/common/utils/test-utils';

import { ConfigurationService } from './configuration.service';

describe('Test ConfigurationService', () => {
  let service: ConfigurationService;

  const STRING_VAR = 'TEST';
  const NUMBER_VAR = '265';

  beforeEach(async () => {
    process.env['STRING_VAR'] = STRING_VAR;
    process.env['NUMBER_VAR'] = NUMBER_VAR;

    const module = await getTestingModule([ConfigurationService]);
    service = module.get(ConfigurationService);
  });

  it('returns string value of existing env variable', () => {
    expect(typeof service.getStringValue('STRING_VAR')).toBe('string');
    expect(service.getStringValue('STRING_VAR')).toBe(STRING_VAR);
  });

  it('returns undefined if env variable is not set', () => {
    expect(typeof service.getStringValue('STRING_VAR-2')).toBe('undefined');
    expect(service.getStringValue('STRING_VAR-2')).toBe(undefined);
  });

  it('returns default string value', () => {
    expect(typeof service.getStringValue('STRING_VAR-2', 'DEFAULT_VALUE')).toBe(
      'string',
    );
    expect(service.getStringValue('STRING_VAR-2', 'DEFAULT_VALUE')).toBe(
      'DEFAULT_VALUE',
    );
  });

  it('returns number value of existing env variable', () => {
    expect(typeof service.getNumberValue('NUMBER_VAR')).toBe('number');
    expect(service.getNumberValue('NUMBER_VAR')).toBe(parseInt(NUMBER_VAR, 10));
  });

  it('returns undefined if env variable is not set', () => {
    expect(typeof service.getNumberValue('NUMBER_VAR-2')).toBe('undefined');
    expect(service.getNumberValue('NUMBER_VAR-2')).toBe(undefined);
  });

  it('returns default number value', () => {
    expect(typeof service.getNumberValue('NUMBER_VAR-2', 42)).toBe('number');
    expect(service.getNumberValue('NUMBER_VAR-2', 42)).toBe(42);
  });

  it('throws error if string is not set', () => {
    expect(() => service.getStringValueOrFail('STRING_VAR-2')).toThrow();
  });

  it('throws error if number is not set', () => {
    expect(() => service.getNumberValueOrFail('NUMBER_VAR-2')).toThrow();
  });
});

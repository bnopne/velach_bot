import { InMemoryStorageService } from './in-memory-storage.service';

describe('Test InMemoryStorageService', () => {
  let service: InMemoryStorageService;

  beforeEach(() => {
    jest.useFakeTimers();
    service = new InMemoryStorageService();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('set and get value', () => {
    service.set('test', 'value', {});
    expect(service.get('test', {})).toBe('value');
  });

  test('set and get owned value (valid owner)', () => {
    service.set('test', 'value', { ownerId: '123' });
    expect(service.get('test', { ownerId: '123' })).toBe('value');
  });

  test('set and get owned value (invalid owner)', () => {
    service.set('test', 'value', { ownerId: '123' });
    expect(() => service.get('test', { ownerId: '456' })).toThrowError(
      'In-memory value access denied',
    );
  });

  test('set and get owned value (undefined owner)', () => {
    service.set('test', 'value', { ownerId: '123' });
    expect(() => service.get('test', {})).toThrowError(
      'In-memory value access denied',
    );
  });

  test('set value with TTL and try reading after TTL is expired', () => {
    service.set('test', 'value', { TTL: 10 });

    expect(service.get('test', {})).toBe('value');

    jest.advanceTimersByTime(5);

    expect(service.get('test', {})).toBe('value');

    jest.advanceTimersByTime(10);

    expect(() => service.get('test', {})).toThrowError(
      'In-memory value does not exist',
    );
  });

  test('set and delete value', () => {
    service.set('test', 'value', {});

    expect(service.get('test', {})).toBe('value');

    service.delete('test', {});

    expect(() => service.get('test', {})).toThrowError(
      'In-memory value does not exist',
    );
  });

  test('set and delete owned value (valid user)', () => {
    service.set('test', 'value', { ownerId: '123' });

    expect(service.get('test', { ownerId: '123' })).toBe('value');

    service.delete('test', { ownerId: '123' });

    expect(() => service.get('test', { ownerId: '123' })).toThrowError(
      'In-memory value does not exist',
    );
  });

  test('set and delete owned value (invalid user)', () => {
    service.set('test', 'value', { ownerId: '123' });

    expect(service.get('test', { ownerId: '123' })).toBe('value');

    expect(() => service.delete('test', { ownerId: '456' })).toThrowError(
      'In-memory value delete denied',
    );

    expect(service.get('test', { ownerId: '123' })).toBe('value');
  });

  test('set and delete owned value (undefined user)', () => {
    service.set('test', 'value', { ownerId: '123' });

    expect(service.get('test', { ownerId: '123' })).toBe('value');

    expect(() => service.delete('test', {})).toThrowError(
      'In-memory value delete denied',
    );

    expect(service.get('test', { ownerId: '123' })).toBe('value');
  });
});

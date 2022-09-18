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
    expect(service.get('test')).toBe(undefined);

    service.set('test', 'value');

    expect(service.get('test')).toBe('value');
  });

  test('set value with TTL and try reading after TTL is expired', () => {
    service.set('test', 'value', 10);

    expect(service.get('test')).toBe('value');

    jest.advanceTimersByTime(5);

    expect(service.get('test')).toBe('value');

    jest.advanceTimersByTime(10);

    expect(service.get('test')).toBe(undefined);
  });
});

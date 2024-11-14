export class InMemoryStorage {
  private readonly storage: Map<string, unknown>;
  private readonly timeoutIds: Map<string, ReturnType<typeof setTimeout>>;

  constructor() {
    this.storage = new Map<string, unknown>();
    this.timeoutIds = new Map<string, ReturnType<typeof setTimeout>>();
  }

  setValue(key: string, value: unknown, ttl?: number): void {
    const timeoutId = this.timeoutIds.get(key);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    this.storage.set(key, value);

    if (ttl) {
      this.timeoutIds.set(
        key,
        setTimeout(() => {
          this.storage.delete(key);
        }, ttl),
      );
    }
  }

  getValue<T>(key: string): T | undefined {
    const value = this.storage.get(key);

    if (value === undefined) {
      return undefined;
    }

    return value as T;
  }

  deleteValue(key: string): void {
    const timeoutId = this.timeoutIds.get(key);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    this.storage.delete(key);
  }

  destroy(): void {
    this.timeoutIds.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
  }
}

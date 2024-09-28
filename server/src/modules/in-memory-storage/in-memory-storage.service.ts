import { Injectable, OnModuleDestroy } from '@nestjs/common';

type TInMemoryValueSetOptions = {
  TTL?: number;
  ownerId?: string;
};

type TInMemoryValueAccessOptions = {
  ownerId?: string;
};

type TInMemoryValue = {
  value: unknown;
  metadata: {
    ownerId?: string;
  };
};

@Injectable()
export class InMemoryStorageService implements OnModuleDestroy {
  private storage: Record<string, TInMemoryValue>;
  private storageTimeouts: Record<string, ReturnType<typeof setTimeout>>;

  constructor() {
    this.storage = {};
    this.storageTimeouts = {};
  }

  set(
    key: string,
    value: unknown,
    { TTL, ownerId }: TInMemoryValueSetOptions,
  ): void {
    const timeout = this.storageTimeouts[key];

    if (timeout != null) {
      clearTimeout(timeout);
      delete this.storageTimeouts[key];
    }

    this.storage[key] = {
      value,
      metadata: {
        ownerId,
      },
    };

    if (typeof TTL === 'number') {
      this.storageTimeouts[key] = setTimeout(() => {
        delete this.storage[key];
      }, TTL);
    }
  }

  get<T>(key: string, { ownerId }: TInMemoryValueAccessOptions): T {
    const storedValue = this.storage[key];

    if (!storedValue) {
      throw new Error('In-memory value does not exist');
    }

    const { value, metadata } = storedValue;

    if (metadata.ownerId && metadata.ownerId !== ownerId) {
      throw new Error('In-memory value access denied');
    }

    return value as T;
  }

  delete(key: string, { ownerId }: TInMemoryValueAccessOptions): void {
    const storedValue = this.storage[key];

    if (!storedValue) {
      return;
    }

    const { metadata } = storedValue;

    if (metadata.ownerId && metadata.ownerId !== ownerId) {
      throw new Error('In-memory value delete denied');
    }

    delete this.storage[key];

    if (Object.keys(this.storageTimeouts).includes(key)) {
      clearTimeout(this.storageTimeouts[key]);
      delete this.storageTimeouts[key];
    }
  }

  onModuleDestroy() {
    Object.keys(this.storageTimeouts).forEach((key) => {
      clearTimeout(this.storageTimeouts[key]);
    });
  }
}

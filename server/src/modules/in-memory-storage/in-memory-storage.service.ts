import { Injectable, OnModuleDestroy } from '@nestjs/common';

import { Optional } from 'src/common/types/utils';

@Injectable()
export class InMemoryStorageService implements OnModuleDestroy {
  private storage: Record<string, unknown>;
  private storageTimeouts: Record<string, ReturnType<typeof setTimeout>>;

  constructor() {
    this.storage = {};
    this.storageTimeouts = {};
  }

  set(key: string, value: unknown, TTL?: number): void {
    const timeout = this.storageTimeouts[key];

    if (timeout != null) {
      clearTimeout(timeout);
      delete this.storageTimeouts[key];
    }

    this.storage[key] = value;

    if (TTL != null) {
      this.storageTimeouts[key] = setTimeout(() => {
        delete this.storage[key];
      }, TTL);
    }
  }

  get<T>(key: string): Optional<T> {
    return this.storage[key] as T;
  }

  delete(key: string): void {
    if (Object.keys(this.storage).includes(key)) {
      delete this.storage[key];
    }

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

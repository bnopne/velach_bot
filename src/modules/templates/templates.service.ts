import { readFile } from 'fs/promises';

import { Injectable } from '@nestjs/common';
import { render } from 'mustache';

@Injectable()
export class TemplatesService {
  private templates: Map<string, string>;

  constructor() {
    this.templates = new Map<string, string>();
  }

  async loadTemplate(path: string): Promise<string> {
    if (!this.templates.has(path)) {
      const template = (await readFile(path)).toString();
      this.templates.set(path, template);
    }

    const template = this.templates.get(path);

    if (!template) {
      throw new Error(`Could not load template ${path} for some reason`);
    }

    return template;
  }

  async renderTemplate<T>(path: string, context: T): Promise<string> {
    const template = await this.loadTemplate(path);
    return render(template, context);
  }
}

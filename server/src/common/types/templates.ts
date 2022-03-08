export interface TemplateContextExtension {
  [key: string]: any;
}

export interface TemplateContext {
  commands: {
    [key: string]: string;
  };
  [key: string]: any;
}

export interface Template {
  (context: TemplateContext): string;
}

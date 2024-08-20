export class InvalidArgumentsError extends Error {
  constructor(text?: string) {
    super();
    this.message = `Некорректные аргументы: ${text}`;
  }
}

export class AppError extends Error {
  constructor(text: string) {
    super();
    this.message = text;
  }
}

export default class HttpError extends Error {
  code: number;
  message: string;

  constructor(message: string, errorCode: number) {
    super(message);
    this.code = errorCode;
    this.message = message;
  }
}

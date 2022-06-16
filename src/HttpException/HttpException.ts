export default class HttpException extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

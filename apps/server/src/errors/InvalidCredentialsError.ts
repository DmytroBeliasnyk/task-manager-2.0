import { AuthErrors } from '@shared/types/auth';

export default class InvalidCredentialsError extends Error {
  public status: number;
  public data: AuthErrors = {};

  constructor(message: string, data: AuthErrors = {}, status: number = 401) {
    super(message);
    this.name = 'InvalidCredentialsError';
    this.data = data;
    this.status = status;

    Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }
}

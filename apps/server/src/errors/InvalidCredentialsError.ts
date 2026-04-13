import { UserDataErrors } from '@shared/types/userdata';

export default class InvalidCredentialsError extends Error {
  public status: number;
  public data: UserDataErrors = {};

  constructor(message: string, data: UserDataErrors = {}, status: number = 401) {
    super(message);
    this.name = 'InvalidCredentialsError';
    this.data = data;
    this.status = status;

    Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }
}

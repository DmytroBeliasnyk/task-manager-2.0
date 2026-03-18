export default class NonExistentIDError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NonExistentIDError';
  }
}
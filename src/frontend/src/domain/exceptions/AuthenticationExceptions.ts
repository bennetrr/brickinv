export interface IInvalidCredentialsErrorMessage {
  id: string;
  message: string;
}

export class InvalidCredentialsError extends Error {
  public messages: IInvalidCredentialsErrorMessage[];

  constructor(messages: IInvalidCredentialsErrorMessage[]) {
    super();
    this.messages = messages;
  }

}

export class UnauthorizedError extends Error {

}

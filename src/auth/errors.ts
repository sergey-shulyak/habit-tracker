export class UserNotFoundError extends Error {
  public message = 'Such user does not exist'
}

export class InvalidCredentialsError extends Error {
  public message = 'Invalid email or password'
}

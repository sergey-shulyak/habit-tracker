import { ConflictException } from '@nestjs/common'

export class UserNotFoundError extends Error {
  public message = 'Such user does not exist'
}

export class UserConflictError extends ConflictException {}

export class InvalidCredentialsError extends Error {
  public message = 'Invalid email or password'
}

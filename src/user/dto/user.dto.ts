export class CreateUserDto {
  public readonly email: string
  public readonly name: string
  public readonly password: string
}

export class UpdateUserDto {
  public readonly email?: string
  public readonly name?: string
  public readonly password?: string
}

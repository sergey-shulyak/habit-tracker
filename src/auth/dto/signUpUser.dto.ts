import { IsString, IsEmail, IsAlphanumeric, MinLength } from 'class-validator'

export class SignUpUserDto {
  @IsEmail()
  public readonly email: string

  @IsString()
  public readonly name: string

  @IsString()
  @IsAlphanumeric()
  @MinLength(8)
  public readonly password: string
}

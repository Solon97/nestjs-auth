import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { User } from '../entities/user.entity'

export class CreateUserDto implements User {
    @IsEmail()
      email: string

    @IsString()
      name: string

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'password too weak'
    })
      password: string
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    type: String,
    required: true,
    example: 'Mert',
  })
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Role of the user',
    type: String,
    required: true,
    example: 'User',
    enum: ['User', 'Admin', 'StoreManager'],
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(User|Admin|StoreManager)$/, {
    message: 'ً must be either user, admin or manager',
  })
  role: string = 'User';

  @ApiProperty({
    description: 'Email of the user',
    type: String,
    required: true,
    example: 'admin@example.com',
  })
  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    type: String,
    required: true,
    example: 'password',
  })
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters`,
  })
  password: string;
}

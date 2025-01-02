import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

export class LoginDto {
  @ApiProperty({
    description: 'Email of the user',
    type: String,
    required: true,
    example: 'admin@example.com',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail(null, { message: 'Please provide a valid Email.' })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    type: String,
    required: true,
    example: 'Admin123!',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(passwordRegEx, {
    message: `Password must be 8-20 characters, include uppercase, lowercase, and a number.`,
  })
  password: string;
}

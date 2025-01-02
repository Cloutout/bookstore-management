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
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, {
    message: 'Please provide valid Email.',
  })
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    type: String,
    required: true,
    example: 'password',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters`,
  })
  password: string;
}

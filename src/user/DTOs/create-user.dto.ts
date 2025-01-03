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
  @ApiProperty({ description: 'Name of the admin', example: 'Mert' })
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Role of the user',
    example: 'admin',
    enum: ['user', 'admin', 'storeManager'],
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(user|admin|storeManager)$/, {
    message: 'Role must be either "user", "admin", or "storeManager".',
  })
  role: string = 'admin';

  @ApiProperty({ description: 'Email of the user', example: 'admin@admin.com' })
  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide a valid email.' })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'Password123!',
  })
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  password: string;
}

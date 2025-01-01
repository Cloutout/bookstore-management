// src/users/dtos/update-user.dto.ts
import { Role } from '../../auth/role.enum';
import {
  IsString,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  IsEnum,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly username?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Role, { each: true })
  readonly roles?: Role[];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ description: 'The title of the book', default: 'Book Title' })
  @IsString()
  @MinLength(2, { message: 'Title must have at least 2 characters' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The author of the book',
    default: 'Author Name',
  })
  @IsString()
  @MinLength(2, { message: 'Author must have at least 2 characters' })
  @IsNotEmpty()
  author: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateBookQuantityDto {
  @ApiProperty({ description: 'The ID of the book.', example: 1 })
  @IsNotEmpty()
  bookId: number;

  @ApiProperty({ description: 'The quantity to add or remove.', example: 5 })
  @IsPositive()
  @IsNotEmpty()
  quantity: number;
}

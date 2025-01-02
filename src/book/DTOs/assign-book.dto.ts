import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class AssignBookDto {
  @ApiProperty({ description: 'The ID of the book.' })
  @IsNotEmpty()
  book_id: number;

  @ApiProperty({ description: 'The ID of the store.' })
  @IsNotEmpty()
  store_id: number;

  @ApiProperty({ description: 'The quantity of the book.', default: 1 })
  @IsPositive()
  quantity: number;

  @ApiProperty({ description: 'The price of the book.', default: 0 })
  price: number;
}

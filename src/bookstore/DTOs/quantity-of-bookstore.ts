import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class quantityOfBookstore {
  @ApiProperty({
    description: 'The id of the book',
    default: 1,
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'The id of the bookstore',
    default: '1',
  })
  @IsNotEmpty()
  bookstoreId: string;

  @ApiProperty({
    description: 'The quantity of the book in the bookstore',
    default: 1,
  })
  @IsPositive()
  @IsNotEmpty()
  quantity: number;
}

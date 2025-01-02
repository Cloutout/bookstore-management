import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class quantityOfBookstore {
  @ApiProperty({ description: 'Book ID' })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: 'Bookstore ID' })
  @IsNotEmpty()
  bookstoreId: number;

  @ApiProperty({ description: 'Quantity' })
  @IsPositive()
  @IsNotEmpty()
  quantity: number;
}

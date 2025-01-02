import { Module } from '@nestjs/common';
import { BookstoreService } from '../service/bookstore.service';
import { BookstoreController } from '../controllers/bookstore.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/book/entities/book.entity';
import { Bookstore } from '../entities/bookstore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Bookstore])],
  controllers: [BookstoreController],
  providers: [BookstoreService],
})
export class BookstoreModule {}

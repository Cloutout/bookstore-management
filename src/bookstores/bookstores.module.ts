import { Module } from '@nestjs/common';
import { BookstoresService } from './bookstores.service';
import { BookstoresController } from './bookstores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookstore } from './entities/bookstore.entity';
import { Book } from '../books/entities/book.entity';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bookstore, Book]), BooksModule],
  providers: [BookstoresService],
  controllers: [BookstoresController],
})
export class BookstoresModule {}

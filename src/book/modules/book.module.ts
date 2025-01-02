import { Module } from '@nestjs/common';
import { BookService } from '../services/book.service';
import { BookController } from '../controllers/book.controller';
import { Book } from '../entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookstore } from 'src/bookstore/entities/bookstore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Bookstore])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}

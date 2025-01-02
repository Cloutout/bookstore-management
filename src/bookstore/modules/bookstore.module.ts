import { Module } from '@nestjs/common';
import { BookstoreService } from '../services/bookstore.service';
import { BookstoreController } from '../controllers/bookstore.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookstore } from '../entities/bookstore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookstore])],
  controllers: [BookstoreController],
  providers: [BookstoreService],
})
export class BookstoreModule {}

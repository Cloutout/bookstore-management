import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/modules/user.module';
import { BookModule } from './book/modules/book.module';
import { BookstoreModule } from './bookstore/modules/bookstore.module';
import { User } from './user/entities/user.entity';
import { Book } from './book/entities/book.entity';
import { Bookstore } from './bookstore/entities/bookstore.entity';
import { Availability } from './book/entities/availability.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Book, Bookstore, Availability],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    BookModule,
    BookstoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

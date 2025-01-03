import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/modules/user.module';
import { BookModule } from './book/modules/book.module';
import { BookstoreModule } from './bookstore/modules/bookstore.module';
import { User } from './user/entities/user.entity';
import { Book } from './book/entities/book.entity';
import { Bookstore } from './bookstore/entities/bookstore.entity';
import { Availability } from './book/entities/availability.entity';
import { AuthModule } from './auth/modules/auth.module';

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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

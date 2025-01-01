// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { BookstoresModule } from './bookstores/bookstores.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // PostgreSQL kullanıcı adınız
      password: 'password', // PostgreSQL şifreniz
      database: 'bookstore_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Geliştirme aşamasında true, üretim için false olmalı
    }),
    AuthModule,
    BooksModule,
    BookstoresModule,
    UsersModule,
  ],
})
export class AppModule {}

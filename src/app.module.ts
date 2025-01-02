import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/modules/user.model';
import { User } from './user/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { BookstoreModule } from './bookstore/models/bookstore.module';
import { BookModule } from './book/modules/book.module';
import { Book } from './book/entities/book.entity';
import { Bookstore } from './bookstore/entities/bookstore.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USER,
      entities: [User, Bookstore, Book],
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    BookstoreModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

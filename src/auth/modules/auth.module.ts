import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { AuthController } from '../controllers/auth.controller';
import { UserModule } from 'src/user/modules/user.module';
import { jwtConfig } from 'src/auth/config/jwt.config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

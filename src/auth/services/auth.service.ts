import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwt(user: any): Promise<string> {
    const payload = { username: user.username, sub: user.id, roles: user.roles };
    return this.jwtService.sign(payload);
  }
}

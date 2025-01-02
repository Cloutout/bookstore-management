import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { AuthService } from '../services/auth.service'; // JWT token için AuthService
import { LoginDto } from '../dto/login.dto';
import { Public } from '../decorators/public.decorator';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService, // Token üretimi için
  ) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto): Promise<any> {
    // Kullanıcıyı doğrulama
    const user = await this.userService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // JWT token üretme
    const token = await this.authService.generateJwt(user);
    return { user, token };
  }
}

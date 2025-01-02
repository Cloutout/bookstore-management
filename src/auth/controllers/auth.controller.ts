import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../DTOs/login.dto';
import { Public } from '../decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login user and return JWT token' })
  @ApiResponse({ status: 201, description: 'User logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return token;
  }
}

import { Body, Controller, Get, Post, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService, private jwt: JwtService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string; name: string }) {
    return this.auth.register(body.email, body.password, body.name);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }, @Res({ passthrough: true }) res: Response) {
    const { token, user } = await this.auth.login(body.email, body.password);
    const isProd = process.env.NODE_ENV === 'production';
    // In production on HTTPS (Render), cookies must be SameSite=None and Secure for cross-site
    res.cookie(process.env.COOKIE_NAME || 'auth', token, {
      httpOnly: true,
      secure: isProd, // Render uses HTTPS; set true in production
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });
    return { user };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    const isProd = process.env.NODE_ENV === 'production';
    res.clearCookie(process.env.COOKIE_NAME || 'auth', {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
    });
    return { ok: true };
  }

  @Get('me')
  async me(@Req() req: any) {
    const token = req.cookies?.[process.env.COOKIE_NAME || 'auth'];
    if (!token) return { user: null };
    try {
      const payload = this.jwt.verify(token, { secret: process.env.JWT_SECRET });
      return { user: { id: payload.sub, email: payload.email, name: payload.name } };
    } catch {
      return { user: null };
    }
  }
}

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(email: string, password: string, name: string) {
    try {
      const existing = await this.prisma.user.findUnique({ where: { email } });
      if (existing) throw new BadRequestException('Email already registered');
      const hash = await bcrypt.hash(password, 10);
      const user = await this.prisma.user.create({ data: { email, password: hash, name } });
      return { id: user.id, email: user.email, name: user.name };
    } catch (err) {
      console.error('Register error:', err);
      throw err;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) throw new UnauthorizedException('Invalid credentials');
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) throw new UnauthorizedException('Invalid credentials');
      const token = await this.jwt.signAsync({ sub: user.id, email: user.email, name: user.name });
      return { token, user: { id: user.id, email: user.email, name: user.name } };
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  }
}

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtSvc: JwtService) {}

  public async hashPassword(password: string, saltOrRounds = 10) {
    return await bcrypt.hash(password, saltOrRounds);
  }

  public async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  public async createToken(payload) {
    return await this.jwtSvc.signAsync(payload);
  }

  public async verifyToken(token: string) {
    return await this.jwtSvc.verifyAsync(token, { secret: process.env.SECRET });
  }
}

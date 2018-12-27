import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import {User} from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService
  ) {}

  public async createToken(user: User): Promise<string> {
    return this.jwtService.sign({username: user.username});
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await User.findOneOrFail({username: payload.username});
  }
}

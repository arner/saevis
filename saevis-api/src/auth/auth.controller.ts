import {Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import {ApiUseTags} from '@nestjs/swagger';
import {User} from '../users/user.entity';
import {Login} from './login.dto';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() login: Login): Promise<any> {
    const user = await User.findOneOrFail({username: login.username}) as User;
    user.token = await this.authService.createToken(user);

    return user;
  }
}

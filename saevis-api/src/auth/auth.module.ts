import { Module } from '@nestjs/common';
import {JwtModule, JwtService} from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import {UsersService} from '../users/users.service';
import {UsersModule} from '../users/users.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 360000,
      },
    }),
    UsersModule
  ],
  providers: [AuthService, JwtStrategy, UsersService],
  controllers: [AuthController],
  exports: [PassportModule]
})
export class AuthModule {}

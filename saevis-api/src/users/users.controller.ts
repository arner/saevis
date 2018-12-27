import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {User} from './user.entity';
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth, ApiUseTags} from '@nestjs/swagger';

@Controller('users')
@ApiUseTags('user')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(){}

  @Get()
  public async findAll(): Promise<User[]> {
    return await User.find();
  }

  @Post()
  public async create(@Body() user: User): Promise<User> {
    return await user.save();
  }
}

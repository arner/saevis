import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {User} from './user.entity';
import {AuthGuard} from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService){}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async findAll(@Query() query?: any): Promise<User[]> {
    return await this.usersService.findAll();
  }

}

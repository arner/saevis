import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import {Content} from './content.entity';
import {ApiBearerAuth} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';

@Controller('content')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class ContentController {
  constructor() { }

  @Post()
  public async create(@Body() content: Content, @Req() req): Promise<Content> {
    ['poll', 'event', 'discussion'].forEach((contentType) => {
      if (content[contentType]) {
        content[contentType].createdBy = req.user;
      }
    });

    return await content.save();
  }
}

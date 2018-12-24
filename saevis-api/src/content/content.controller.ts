import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import {Content} from './content.entity';
import {ContentService} from './content.service';
import {ApiBearerAuth} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';

@Controller('content')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class ContentController {
  constructor(private contentService: ContentService) { }

  @Post()
  public async create(@Body() content: Content, @Req() req): Promise<Content> {
    content.createdBy = req.user;

    return await this.contentService.create(content);
  }
}

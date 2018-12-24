import {
  Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards
} from '@nestjs/common';
import {TopicService} from './topic.service';
import {Topic} from './topic.entity';
import {ApiBearerAuth} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';

@Controller('topics')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class TopicController {
  constructor(private topicService: TopicService) { }

  @Get()
  public async findAll(@Query() query?: any): Promise<Topic[]> {
    return await this.topicService.findAll();
  }

  @Post()
  public async create(@Body() topic: Topic): Promise<Topic> {
    return await this.topicService.create(topic);
  }

  @Get(':id')
  public async findOne(@Param('id', new ParseIntPipe()) id): Promise<Topic> {
    return await this.topicService.findOne(id);
  }
  //
  // @Put(':id')
  // public async update(@Param('id') id,  @Body() updateCatDto) {
  //
  // }
  //
  // @Delete(':id')
  // public async delete(@Param('id') id) {
  //
  // }
}

import {
  Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, ReflectMetadata, Req, UseGuards
} from '@nestjs/common';
import {Topic} from './topic.entity';
import {ApiBearerAuth, ApiUseTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {IsCreator} from '../auth/is-creator.guard';
import {SubjectEntity} from '../auth/entity.decorator';

@Controller('topics')
@ApiBearerAuth()
@ApiUseTags('topic')
@UseGuards(AuthGuard('jwt'))
export class TopicController {
  constructor() { }

  @Get()
  public async findAll(): Promise<Topic[]> {
    return await Topic.find({ relations: ['content'] });
  }

  @Post()
  public async create(@Body() topic: Topic, @Req() req): Promise<Topic> {
    delete topic.id;

    topic.createdBy = req.user;

    return await Topic.save(topic);
  }

  @Get(':id')
  public async findOne(@Param('id') id: number): Promise<Topic> {
    return await Topic.findOne({where: {id}, relations: ['content']});
  }

  @Put(':id')
  @UseGuards(IsCreator)
  @SubjectEntity(Topic)
  public async update(@Param('id') id: number,  @Body() topic: Topic): Promise<Topic> {
    const existingTopic = await Topic.findOneOrFail(id) as Topic;
    existingTopic.title = topic.title;
    existingTopic.text = topic.text;

    return await existingTopic.save();
  }
  //
  // @Delete(':id')
  // public async delete(@Param('id') id) {
  //
  // }
}

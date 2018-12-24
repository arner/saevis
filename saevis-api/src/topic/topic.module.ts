import { Module } from '@nestjs/common';
import {TopicController} from './topic.controller';
import {TopicService} from './topic.service';
import {Topic} from './topic.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Topic]),
  ],
  providers: [TopicService],
  controllers: [TopicController]
})
export class TopicModule {}

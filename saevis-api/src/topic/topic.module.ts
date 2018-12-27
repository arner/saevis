import { Module } from '@nestjs/common';
import {TopicController} from './topic.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [TopicController]
})
export class TopicModule {}

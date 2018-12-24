import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Poll} from './poll.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Poll])]
})
export class PollModule {}

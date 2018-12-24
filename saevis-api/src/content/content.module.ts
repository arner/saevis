import { Module } from '@nestjs/common';
import { PollModule } from './poll/poll.module';
import { EventModule } from './event/event.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Content} from './content.entity';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content]),
    PollModule,
    EventModule
  ],
  providers: [ContentService],
  controllers: [ContentController]
})
export class ContentModule {}

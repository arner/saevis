import { Module } from '@nestjs/common';
import { PollModule } from './poll/poll.module';
import { EventModule } from './event/event.module';
import { ContentController } from './content.controller';
import { DiscussionModule } from './discussion/discussion.module';

@Module({
  imports: [
    PollModule,
    EventModule,
    DiscussionModule
  ],
  providers: [],
  controllers: [ContentController]
})
export class ContentModule {}

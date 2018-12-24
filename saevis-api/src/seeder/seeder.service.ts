import { Injectable } from '@nestjs/common';
import {Topic} from '../topic/topic.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../users/user.entity';
import {Poll} from '../content/poll/poll.entity';
import {Content} from '../content/content.entity';
import {Event} from '../content/event/event.entity';

@Injectable()
export class SeederService {

  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>
  ) {
  }

  public async seed(): Promise<void> {
    let user1 = new User();
    user1.email = 'arne@example.com';
    user1.username = 'arne';
    user1 = await this.userRepository.save(user1);

    let user2 = new User();
    user2.email = 'alice@example.com';
    user2.username = 'alice';
    user2 = await this.userRepository.save(user2);

    let topic = await this.topicRepository.save(new Topic({
      title: 'Putten 2019',
      createdBy: user1
    }));

    await this.contentRepository.save(
      new Content({
        poll: new Poll({
          text: 'testPoll'
        }),
        topic
      })
    );

    await this.contentRepository.save(new Content({
      topicId: topic.id,
      event: new Event({
        text: 'testevent',
        startTime: new Date(),
        endTime: new Date()
      })
    }));
  }
}

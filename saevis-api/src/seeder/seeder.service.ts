import { Injectable } from '@nestjs/common';
import {Topic} from '../topic/topic.entity';
import {User} from '../users/user.entity';
import {Poll} from '../content/poll/poll.entity';
import {Content} from '../content/content.entity';
import {Event} from '../content/event/event.entity';
import {Discussion} from '../content/discussion/discussion.entity';
import {Comment} from '../content/discussion/comment.entity';
import {ContentType} from '../content/content-type.enum';

@Injectable()
export class SeederService {

  constructor() {}

  public async seed(): Promise<void> {
    const user1 = await new User({
      email: 'arne@example.com',
      username: 'arne'
    }).save();

    const user2 = await new User({
      email: 'alice@example.com',
      username: 'alice'
    }).save();

    const topic = await new Topic({
      title: 'Putten 2019',
      createdBy: user1
    }).save();

    await new Topic({
      title: 'Alices Topic',
      createdBy: user2
    }).save();

    await new Content({
      topicId: topic.id,
      type: ContentType.POLL,
      poll: new Poll({
        text: 'testPoll'
      })
    }).save();

    await new Content({
      topicId: topic.id,
      type: ContentType.EVENT,
      event: new Event({
        title: 'testevent',
        startTime: new Date(),
        endTime: new Date(),
        createdBy: user1
      })
    }).save();

    const content = await new Content({
      topicId: topic.id,
      type: ContentType.DISCUSSION,
      discussion: new Discussion({
        text: 'Who was the greatest artist of all time?',
        createdBy: user1
      })
    }).save();

    await new Comment({
      text: 'Madonna',
      discussionId: content.discussion.id,
      createdBy: user2
    }).save();

    const long = 'Scuttle rigging scurvy cog lee nipper Letter of Marque transom Buccaneer Privateer. Chain Shot ho Letter of Marque hornswaggle booty fathom jack bounty maroon Barbary Coast. Nipperkin Barbary Coast measured fer yer chains blow the man down Letter of Marque smartly splice the main brace furl parley starboard.';
    const texts = ['Kanye', long, 'Michael Jackson is my favorite.', 'Wat Aans', 'Queen!', 'Come on, Queen, really?', 'No idea.', 'Ima let you finish....'];

    texts.forEach(async (text, id) => {
      return new Comment({
        text: text,
        discussionId: content.discussion.id,
        createdBy: user2
      }).save();
    });

    //await Comment.save(comments);
  }
}

import {
  BaseEntity, Column, Entity, ManyToOne, OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import {Topic} from '../topic/topic.entity';
import {Poll} from './poll/poll.entity';
import {Event} from './event/event.entity';
import {IsNotEmpty, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {ApiModelProperty} from '@nestjs/swagger';
import {Discussion} from './discussion/discussion.entity';
import {ContentType} from './content-type.enum';

@Entity()
export class Content extends BaseEntity {
  public constructor(content?: Partial<Content>) {
    super();

    if (content) {
      Object.assign(this, content);
    }
  }

  @ApiModelProperty({required: false, readOnly: true, type: 'integer'})
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  @ApiModelProperty({required: false, type: 'integer'})
  topicId: number;

  @ManyToOne(type => Topic, (topic: Topic) => topic.content)
  topic: Topic;

  @IsNotEmpty()
  @Column({'enum': ContentType})
  @ApiModelProperty({'enum': ['POLL', 'DISCUSSION', 'EVENT']})
  type: ContentType;

  // Types
  @Type(() => Poll)
  @ValidateNested()
  @ApiModelProperty({required: false, type: Poll})
  @OneToOne(type => Poll, (poll: Poll) => poll.content, {
    eager: true,
    cascade: ['insert']
  })
  poll: Poll;

  @ValidateNested()
  @Type(() => Event)
  @ApiModelProperty({required: false, type: Event})
  @OneToOne(type => Event, (event: Event) => event.content, {
    eager: true,
    cascade: ['insert']
  })
  event: Event;

  @ValidateNested()
  @Type(() => Discussion)
  @ApiModelProperty({required: false, type: Discussion})
  @OneToOne(type => Discussion, (discussion: Discussion) => discussion.content, {
    eager: true,
    cascade: ['insert']
  })
  discussion: Discussion;
}

import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Topic} from '../topic/topic.entity';
import {Poll} from './poll/poll.entity';
import {Event} from './event/event.entity';
import {IsNotEmpty, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {ApiModelProperty} from '@nestjs/swagger';
import {User} from '../users/user.entity';

@Entity()
export class Content {
  public constructor(content?: Partial<Content>) {
    if (content) {
      Object.assign(this, content);
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  @ApiModelProperty()
  topicId: number;

  @ManyToOne(type => Topic, (topic: Topic) => topic.content)
  topic: Topic;

  @JoinColumn()
  @ManyToOne(type => User, {eager: true})
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  // Types
  @Type(() => Poll)
  @ValidateNested()
  @ApiModelProperty()
  @OneToOne(type => Poll, (poll: Poll) => poll.content, {
    eager: true,
    cascade: ['insert']
  })
  poll: Poll;

  @ValidateNested()
  @Type(() => Event)
  @ApiModelProperty()
  @OneToOne(type => Event, (event: Event) => event.content, {
    eager: true,
    cascade: ['insert']
  })
  event: Event;
}

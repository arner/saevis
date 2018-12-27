import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne} from 'typeorm';
import {Content} from '../content.entity';
import {IsDateString} from 'class-validator';
import {User} from '../../users/user.entity';
import {CreatedEntity} from '../../created.entity';
import {ApiModelProperty} from '@nestjs/swagger';

@Entity()
export class Event extends CreatedEntity {
  public constructor(event?: Partial<Event>) {
    super();
    Object.assign(this, event);
  }

  @ApiModelProperty({'default': '', example: 'Comic convention'})
  @Column()
  title: string;

  @ApiModelProperty({'default': 'A cosy gathering of comic enthousiasts.'})
  @Column({'default': ''})
  text: string;

  @JoinColumn()
  @OneToOne(type => Content, (content: Content) => content.event)
  content: Content;

  @ApiModelProperty({type: 'string', format: 'date-time', example: '2018-10-02T09:00:00.05Z'})
  @IsDateString()
  @Column()
  startTime: Date;

  @ApiModelProperty({type: 'string', format: 'date-time', example: '2018-10-02T18:00:00.05Z'})
  @IsDateString()
  @Column()
  endTime: Date;

  //@ApiModelProperty({description: 'All the users participating in this event.'})
  @ManyToMany(type => User, {eager: true})
  @JoinTable()
  participants: User[];

  public async participate(user: User): Promise<Event> {
    if (this.participants.some((p => p.id === user.id))) {
      console.log('Already participating!');

      return this;
    }

    this.participants.push(user);

    return await this.save();
  }

  public async unparticipate(user: User): Promise<Event> {
    const index = this.participants.findIndex((p => p.id === user.id));
    if (index === -1) {
      console.log('Already not participating!');

      return this;
    }

    this.participants.splice(index, 1);

    return await this.save();
  }
}

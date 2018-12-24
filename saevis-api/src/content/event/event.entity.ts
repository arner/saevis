import {Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne} from 'typeorm';
import {Content} from '../content.entity';
import {ContentType} from '../content-type.entity';
import {IsDate, IsDateString, IsNotEmpty} from 'class-validator';
import {User} from '../../users/user.entity';

@Entity()
export class Event extends ContentType {
  public constructor(content: Partial<Event>) {
    super();
    Object.assign(this, content);
  }

  @OneToOne(type => Content, (content: Content) => content.event)
  content: Content;

  @IsDateString()
  @Column()
  startTime: Date;

  @IsDateString()
  @Column()
  endTime: Date;

  @ManyToMany(type => User, {
    eager: true
  })
  @JoinTable()
  participants: User[];
}

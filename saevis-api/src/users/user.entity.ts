import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Topic} from '../topic/topic.entity';
import {Content} from '../content/content.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToMany(type => Topic, (topic: Topic) => topic.createdBy)
  topics: Topic[];

  @OneToMany(type => Topic, (content: Content) => content.createdBy)
  content: Content[];

  @Column({ select: false })
  email: string;
}

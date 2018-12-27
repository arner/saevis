import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Topic} from '../topic/topic.entity';
import {ApiModelProperty} from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
  constructor(user?: Partial<User>) {
    super();

    if (user) {
      Object.assign(this, user);
    }
  }

  @ApiModelProperty({type: 'integer'})
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiModelProperty()
  username: string;

  @OneToMany(type => Topic, (topic: Topic) => topic.createdBy)
  topics: Topic[];

  @Column({ select: false })
  email: string;

  @ApiModelProperty()
  token: string;
}

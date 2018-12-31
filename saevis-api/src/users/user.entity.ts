import {BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Topic} from '../topic/topic.entity';
import {ApiModelProperty} from '@nestjs/swagger';
import {Event} from '../content/event/event.entity';

@Entity()
export class User extends BaseEntity {
  public constructor(user?: Partial<User>) {
    super();

    if (user) {
      Object.assign(this, user);
    }
  }

  @ApiModelProperty({required: false, readOnly: true, type: 'integer'})
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  @ApiModelProperty()
  username: string;

  // One to many relations on User screw up the swagger user reference on the related object
  // @OneToMany(type => Topic, (topic: Topic) => topic.createdBy)
  // topics: Topic[];

  // @ApiModelProperty({required: false, type: [Event]})
  // @ManyToMany(type => Event, (event: Event) => event.participants)
  events: Event[];
  //
  @Column({ select: false })
  email: string;

  @ApiModelProperty({required: false})
  token: string;
}

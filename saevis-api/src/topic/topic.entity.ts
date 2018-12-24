import {
  Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {IsString, Length} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
import {User} from '../users/user.entity';
import {Content} from '../content/content.entity';

@Entity()
export class Topic {
  public constructor(topic?: Partial<Topic>) {
    if (topic) {
      Object.assign(this, topic);
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Length(3, 200)
  @ApiModelProperty()
  @Column({ length: 200 })
  title: string;

  text: string;

  @OneToMany(type => Content, (content: Content) => content.topic)
  content: Content[];

  @ManyToOne(type => User, (user: User) => user.topics)
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

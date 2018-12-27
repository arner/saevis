import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Discussion} from './discussion.entity';
import {CreatedEntity} from '../../created.entity';
import {ApiModelProperty} from '@nestjs/swagger';

@Entity()
export class Comment extends CreatedEntity {
  public constructor(content?: Partial<Comment>) {
    super();

    if (content) {
      Object.assign(this, content);
    }
  }

  @Column({ select: false })
  discussionId: number;

  @ManyToOne(type => Discussion)
  discussion: Discussion;

  @Column()
  @ApiModelProperty()
  text: string;
}

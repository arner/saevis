import {Column, Entity, JoinColumn, OneToMany, OneToOne} from 'typeorm';
import {Content} from '../content.entity';
import {Comment} from './comment.entity';
import {ApiModelProperty} from '@nestjs/swagger';
import {ContentItem} from '../content-item.entity';

@Entity()
export class Discussion extends ContentItem {
  public constructor(discussion: Partial<Discussion>) {
    super();
    Object.assign(this, discussion);
  }

  @ApiModelProperty({'default': '', required: false})
  @Column({'default': ''})
  title: string;

  @ApiModelProperty({'default': '', required: false})
  @Column({'default': ''})
  text: string;

  @JoinColumn()
  @OneToOne(type => Content, (content: Content) => content.discussion)
  content: Content;

  @ApiModelProperty({required: false, type: [Comment]})
  @OneToMany(type => Comment, (comment: Comment) => comment.discussion, {eager: true})
  comments: Comment[];
}

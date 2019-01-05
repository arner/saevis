import {Column, Entity, JoinColumn, OneToOne} from 'typeorm';
import {Content} from '../content.entity';
import {ApiModelProperty} from '@nestjs/swagger';
import {ContentItem} from '../content-item.entity';

@Entity()
export class Poll extends ContentItem {
  public constructor(content: Partial<Poll>) {
    super();
    Object.assign(this, content);
  }

  @ApiModelProperty()
  @Column({'default': ''})
  title: string;

  @ApiModelProperty()
  @Column({'default': ''})
  text: string;

  @JoinColumn()
  @OneToOne(type => Content, (content: Content) => content.poll)
  content: Content;
}

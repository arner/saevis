import {Entity, JoinColumn, OneToOne} from 'typeorm';
import {Content} from '../content.entity';
import {ContentType} from '../content-type.entity';

@Entity()
export class Poll extends ContentType {
  public constructor(content: Partial<Poll>) {
    super();
    Object.assign(this, content);
  }

  @OneToOne(type => Content, (content: Content) => content.poll)
  content: Content;
}

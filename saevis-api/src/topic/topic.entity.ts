import {
  Column, Entity, OneToMany
} from 'typeorm';
import {IsOptional, IsString, Length} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
import {Content} from '../content/content.entity';
import {CreatedEntity} from '../created.entity';

@Entity()
export class Topic extends CreatedEntity {
  public constructor(topic?: Partial<Topic>) {
    super();

    if (topic) {
      Object.assign(this, topic);
    }
  }

  @IsString()
  @Length(3, 200)
  @ApiModelProperty()
  @Column({ length: 200 })
  title: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty({required: false})
  @Column({'default': ''})
  text: string;

  @ApiModelProperty({required: false, type: [Content]})
  @OneToMany(type => Content, (content: Content) => content.topic)
  content: Content[];
}

import {Column, Entity} from 'typeorm';
import {ApiModelProperty} from '@nestjs/swagger';
import {CreatedEntity} from '../created.entity';

@Entity()
export abstract class ContentItem extends CreatedEntity {
  @ApiModelProperty({type: 'integer', required: false})
  @Column({nullable: true})
  contentId: number;
}

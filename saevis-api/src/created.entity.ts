import {
  BaseEntity, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import {User} from './users/user.entity';
import {ApiModelProperty} from '@nestjs/swagger';

@Entity()
export abstract class CreatedEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiModelProperty({type: 'integer', required: false})
  id: number;

  @JoinColumn()
  @ManyToOne(type => User, {eager: true})
  @ApiModelProperty({required: false, type: User})
  createdBy: User;

  @ApiModelProperty({required: false})
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiModelProperty({required: false})
  @CreateDateColumn()
  createdAt: Date;
}

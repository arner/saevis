import {
  BaseEntity, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import {User} from './users/user.entity';
import {ApiModelProperty} from '@nestjs/swagger';

@Entity()
export abstract class CreatedEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiModelProperty({type: 'integer'})
  id: number;

  @JoinColumn()
  @ManyToOne(type => User, {eager: true})
  createdBy: User;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

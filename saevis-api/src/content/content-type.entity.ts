import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {Content} from './content.entity';

@Entity()
export abstract class ContentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({'default': ''})
  text: string;

  @JoinColumn()
  @OneToOne(type => Content, (content: Content) => content.event)
  content: Content;

  @UpdateDateColumn()
  updatedAt: Date;
}

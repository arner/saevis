import { Injectable } from '@nestjs/common';
import {Topic} from './topic.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>
  ) {}

  public async create(topic: Topic): Promise<Topic> {
    return await this.topicRepository.save(topic);
  }

  public async findOne(id: number): Promise<Topic> {
    return await this.topicRepository.findOneOrFail(id);
  }

  public async findAll(): Promise<Topic[]> {
    return await this.topicRepository.find({ relations: ['author', 'content'] });
  }
}

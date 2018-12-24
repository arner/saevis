import { Injectable } from '@nestjs/common';
import {Content} from './content.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class ContentService {
  public constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>
  ){}

  public async create(content: Content): Promise<Content> {
    return await this.contentRepository.save(content);
  }
}

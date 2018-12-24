import { Test, TestingModule } from '@nestjs/testing';
import { TopicService } from './topic.service';

describe('TopicsService', () => {
  let service: TopicService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicService],
    }).compile();
    service = module.get<TopicService>(TopicService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
import { Test } from '@nestjs/testing';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';

describe('TopicController', () => {
  let topicController: TopicController;
  let topicService: TopicService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TopicController],
      providers: [TopicService],
    }).compile();

    topicService = module.get<TopicService>(TopicService);
    topicController = module.get<TopicController>(TopicController);
  });

  describe('findAll', () => {
    it('should return an array of topics', async () => {
      const result = ['test'];
      jest.spyOn(topicService, 'findAll').mockImplementation(() => result);

      expect(await topicController.findAll()).toBe(result);
    });
  });
});

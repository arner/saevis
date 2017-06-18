import { BootScript } from '@mean-expert/boot-script';

@BootScript()
class GenerateData {
  constructor(private app: any) {
    console.log('Generating test data');
    console.log(Object.keys(app.models));
    this.createAll();
  }

  private async createAll() {
    const topic = await this.createTopic();
    const poll = await this.createPoll();
    const block = await this.createBlock(poll.id, topic.id);
  }

  private async createPoll(): Promise<any> {
    const poll = {
      "options": {"1":"hi"},
      "settings": {}
    };
    return this.app.models.Poll.create(poll);
  }


  private async createBlock(pollId: number, topicId: number) {
    const block = {
      "type": "p",
      "value": {},
      "blockContentId": pollId,
      "blockContentType": "Poll",
      "topicId": topicId
    };
    return this.app.models.Block.create(block);
  }

  private async createTopic() {
    const topic = {
      "title": "string",
      "text": "string",
    }
    return this.app.models.Topic.create(topic);
  }
}

module.exports = GenerateData;

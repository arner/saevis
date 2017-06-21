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
    const poll = await this.createPoll(topic.id);
   // const block = await this.createBlock(poll.id, topic.id);
  }

  private async createPoll(topicId: number): Promise<any> {
    const poll = {
      "topicId": topicId,
      "text": "Ga je mee?",
      "options": [
        {
          "id": "1",
          "text": "Ja"
        },
        {
          "id": "2",
          "text": "Nee"
        },
        {
          "id": "3",
          "text": "Misschien"
        }
      ],
      "settings": {
        "multipleChoice": false
      }
    };
    return this.app.models.Poll.create(poll);
  }


  private async createBlock(pollId: number, topicId: number) {
    const block = {
      "value": {},
      "blockContentId": pollId,
      "blockContentType": "Poll",
      "topicId": topicId
    };
    return this.app.models.Block.create(block);
  }

  private async createTopic() {
    const topic = {
      "title": "Putten 2017",
      "text": "Wie gaat er mee",
    };
    return this.app.models.Topic.create(topic);
  }
}

module.exports = GenerateData;

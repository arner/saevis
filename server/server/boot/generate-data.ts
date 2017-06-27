import { BootScript } from '@mean-expert/boot-script';

@BootScript()
class GenerateData {
  private poll: any = {
    "text": "Ga je mee?",
    "options": [
      {
        "text": "Ja"
      },
      {
        "text": "Nee"
      },
      {
        "text": "Misschien"
      }
    ],
    "settings": {
      "multipleChoice": false
    }
  };
  private topic: any = {
    "title": "Putten 2017",
    "text": "Wie gaat er mee"
  };

  private event: any = {
    locationText: 'Plek',
    startTime: new Date(2017,8,1,14),
    endTime:  new Date(2017,8,1,22)
  };

  constructor(private app: any) {
    console.log('Generating test data');
    this.createAll();
  }

  private async createAll() {
    const member = this.app.models.Member.create({email: 'arne@example.com', password: 'password'});
    let topic = await this.createTopic('Putten 2017');
    this.createPoll(topic.id);

    topic = await this.createTopic('“Tentazione Isola: partners vs verleiders”');

    topic = await this.createTopic('Wadlooptocht');
    this.createPoll(topic.id);
    this.createEvent(topic.id);

    topic = await this.createTopic('Commiski Invensarisaski');
  }

  private async createPoll(topicId: number) {
    this.poll.topicId = topicId;
    return this.app.models.Poll.create(this.poll);
  }

  private async createEvent(topicId: number) {
    this.event.topicId = topicId;
    return this.app.models.Event.create(this.event);
  }

  private async createTopic(title: string) {
    this.topic.title = title;
    return this.app.models.Topic.create(this.topic);
  }
}

module.exports = GenerateData;

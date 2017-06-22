/* tslint:disable */
import {
  Block,
  Member
} from '../index';

declare var Object: any;
export interface TopicInterface {
  "title"?: string;
  "text"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "creatorId"?: number;
  "topicId"?: number;
  blocks?: Block[];
  creator?: Member;
}

export class Topic implements TopicInterface {
  "title": string;
  "text": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  "creatorId": number;
  "topicId": number;
  blocks: Block[];
  creator: Member;
  constructor(data?: TopicInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Topic`.
   */
  public static getModelName() {
    return "Topic";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Topic for dynamic purposes.
  **/
  public static factory(data: TopicInterface): Topic{
    return new Topic(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Topic',
      plural: 'Topics',
      properties: {
        "title": {
          name: 'title',
          type: 'string'
        },
        "text": {
          name: 'text',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
        "creatorId": {
          name: 'creatorId',
          type: 'number'
        },
        "topicId": {
          name: 'topicId',
          type: 'number'
        },
      },
      relations: {
        blocks: {
          name: 'blocks',
          type: 'Block[]',
          model: 'Block'
        },
        creator: {
          name: 'creator',
          type: 'Member',
          model: 'Member'
        },
      }
    }
  }
}

/* tslint:disable */
import {
  Topic
} from '../index';

declare var Object: any;
export interface PollInterface {
  "text"?: string;
  "options": any;
  "settings"?: any;
  "userVoted"?: boolean;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "blockContentId"?: number;
  "blockContentType"?: string;
  block?: any;
  topic?: Topic;
  votes?: any[];
}

export class Poll implements PollInterface {
  "text": string;
  "options": any;
  "settings": any;
  "userVoted": boolean;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  "blockContentId": number;
  "blockContentType": string;
  block: any;
  topic: Topic;
  votes: any[];
  constructor(data?: PollInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Poll`.
   */
  public static getModelName() {
    return "Poll";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Poll for dynamic purposes.
  **/
  public static factory(data: PollInterface): Poll{
    return new Poll(data);
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
      name: 'Poll',
      plural: 'Polls',
      properties: {
        "text": {
          name: 'text',
          type: 'string'
        },
        "options": {
          name: 'options',
          type: 'any'
        },
        "settings": {
          name: 'settings',
          type: 'any',
          default: <any>null
        },
        "userVoted": {
          name: 'userVoted',
          type: 'boolean'
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
        "blockContentId": {
          name: 'blockContentId',
          type: 'number'
        },
        "blockContentType": {
          name: 'blockContentType',
          type: 'string'
        },
      },
      relations: {
        block: {
          name: 'block',
          type: 'any',
          model: ''
        },
        topic: {
          name: 'topic',
          type: 'Topic',
          model: 'Topic'
        },
        votes: {
          name: 'votes',
          type: 'any[]',
          model: ''
        },
      }
    }
  }
}

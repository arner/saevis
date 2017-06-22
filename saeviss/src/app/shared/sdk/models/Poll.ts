/* tslint:disable */

declare var Object: any;
export interface PollInterface {
  "text"?: string;
  "options": any;
  "settings"?: any;
  "id"?: number;
  "blockContentId"?: number;
  "blockContentType"?: string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "blockCOntentId"?: number;
  block?: any;
}

export class Poll implements PollInterface {
  "text": string;
  "options": any;
  "settings": any;
  "id": number;
  "blockContentId": number;
  "blockContentType": string;
  "createdAt": Date;
  "updatedAt": Date;
  "blockCOntentId": number;
  block: any;
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
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "blockContentId": {
          name: 'blockContentId',
          type: 'number'
        },
        "blockContentType": {
          name: 'blockContentType',
          type: 'string'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
        "blockCOntentId": {
          name: 'blockCOntentId',
          type: 'number'
        },
      },
      relations: {
        block: {
          name: 'block',
          type: 'any',
          model: ''
        },
      }
    }
  }
}

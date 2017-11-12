/* tslint:disable */

declare var Object: any;
export interface BlockInterface {
  "value"?: any;
  "id"?: number;
  "blockContentId"?: number;
  "blockContentType"?: string;
  "topicId"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  blockContent?: any;
  topic?: any;
}

export class Block implements BlockInterface {
  "value": any;
  "id": number;
  "blockContentId": number;
  "blockContentType": string;
  "topicId": number;
  "createdAt": Date;
  "updatedAt": Date;
  blockContent: any;
  topic: any;
  constructor(data?: BlockInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Block`.
   */
  public static getModelName() {
    return "Block";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Block for dynamic purposes.
  **/
  public static factory(data: BlockInterface): Block{
    return new Block(data);
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
      name: 'Block',
      plural: 'Blocks',
      properties: {
        "value": {
          name: 'value',
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
        "topicId": {
          name: 'topicId',
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
      },
      relations: {
        blockContent: {
          name: 'blockContent',
          type: 'any',
          model: ''
        },
        topic: {
          name: 'topic',
          type: 'any',
          model: ''
        },
      }
    }
  }
}

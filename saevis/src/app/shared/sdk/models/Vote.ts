/* tslint:disable */

declare var Object: any;
export interface VoteInterface {
  "value"?: Array<any>;
  "id"?: number;
  "pollId"?: number;
  "voterId"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  poll?: any;
  voter?: any;
}

export class Vote implements VoteInterface {
  "value": Array<any>;
  "id": number;
  "pollId": number;
  "voterId": number;
  "createdAt": Date;
  "updatedAt": Date;
  poll: any;
  voter: any;
  constructor(data?: VoteInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Vote`.
   */
  public static getModelName() {
    return "Vote";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Vote for dynamic purposes.
  **/
  public static factory(data: VoteInterface): Vote{
    return new Vote(data);
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
      name: 'Vote',
      plural: 'Votes',
      properties: {
        "value": {
          name: 'value',
          type: 'Array&lt;any&gt;'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "pollId": {
          name: 'pollId',
          type: 'number'
        },
        "voterId": {
          name: 'voterId',
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
        poll: {
          name: 'poll',
          type: 'any',
          model: ''
        },
        voter: {
          name: 'voter',
          type: 'any',
          model: ''
        },
      }
    }
  }
}

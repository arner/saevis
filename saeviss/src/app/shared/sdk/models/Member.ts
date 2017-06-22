/* tslint:disable */
import {
  Topic
} from '../index';

declare var Object: any;
export interface MemberInterface {
  "realm"?: string;
  "username"?: string;
  "password": string;
  "email": string;
  "emailVerified"?: boolean;
  "verificationToken"?: string;
  "id"?: number;
  "topicId"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  accessTokens?: any[];
  topics?: Topic[];
}

export class Member implements MemberInterface {
  "realm": string;
  "username": string;
  "password": string;
  "email": string;
  "emailVerified": boolean;
  "verificationToken": string;
  "id": number;
  "topicId": number;
  "createdAt": Date;
  "updatedAt": Date;
  accessTokens: any[];
  topics: Topic[];
  constructor(data?: MemberInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Member`.
   */
  public static getModelName() {
    return "Member";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Member for dynamic purposes.
  **/
  public static factory(data: MemberInterface): Member{
    return new Member(data);
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
      name: 'Member',
      plural: 'Members',
      properties: {
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "verificationToken": {
          name: 'verificationToken',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
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
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: ''
        },
        topics: {
          name: 'topics',
          type: 'Topic[]',
          model: 'Topic'
        },
      }
    }
  }
}

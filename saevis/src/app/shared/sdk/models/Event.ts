/* tslint:disable */
import {
  Topic,
  GeoPoint
} from '../index';

declare var Object: any;
export interface EventInterface {
  "startTime": Date;
  "endTime": Date;
  "locationText": string;
  "location"?: GeoPoint;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "blockCOntentId"?: number;
  "blockContentType"?: string;
  topic?: Topic;
  block?: any;
}

export class Event implements EventInterface {
  "startTime": Date;
  "endTime": Date;
  "locationText": string;
  "location": GeoPoint;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  "blockCOntentId": number;
  "blockContentType": string;
  topic: Topic;
  block: any;
  constructor(data?: EventInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Event`.
   */
  public static getModelName() {
    return "Event";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Event for dynamic purposes.
  **/
  public static factory(data: EventInterface): Event{
    return new Event(data);
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
      name: 'Event',
      plural: 'Events',
      properties: {
        "startTime": {
          name: 'startTime',
          type: 'Date'
        },
        "endTime": {
          name: 'endTime',
          type: 'Date'
        },
        "locationText": {
          name: 'locationText',
          type: 'string'
        },
        "location": {
          name: 'location',
          type: 'GeoPoint'
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
        "blockCOntentId": {
          name: 'blockCOntentId',
          type: 'number'
        },
        "blockContentType": {
          name: 'blockContentType',
          type: 'string'
        },
      },
      relations: {
        topic: {
          name: 'topic',
          type: 'Topic',
          model: 'Topic'
        },
        block: {
          name: 'block',
          type: 'any',
          model: ''
        },
      }
    }
  }
}

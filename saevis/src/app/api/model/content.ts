/**
 * Saevis
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */import { Discussion } from './discussion';
import { Event } from './event';
import { Poll } from './poll';


export interface Content { 
    readonly id?: number;
    topicId?: number;
    type: Content.TypeEnum;
    poll?: Poll;
    event?: Event;
    discussion?: Discussion;
}
export namespace Content {
    export type TypeEnum = 'POLL' | 'DISCUSSION' | 'EVENT';
    export const TypeEnum = {
        POLL: 'POLL' as TypeEnum,
        DISCUSSION: 'DISCUSSION' as TypeEnum,
        EVENT: 'EVENT' as TypeEnum
    };
}
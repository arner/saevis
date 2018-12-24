import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, UpdateResult} from 'typeorm';
import {Event} from './event.entity';
import {User} from '../../users/user.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  public async findWithContentOrFail(id: number): Promise<Event> {
    return await this.eventRepository.findOneOrFail(id, {relations: ['content']});
  }

  public async participate(eventId: number, userId: number): Promise<Event> {
    // TODO: handle already participating user gracefully

    await this.eventRepository
      .createQueryBuilder()
      .relation(Event, 'participants')
      .of(eventId)
      .add(userId);

    return await this.eventRepository.findOneOrFail(eventId, {cache: false});
  }

  public async unparticipate(eventId: number, userId: number): Promise<Event> {
    await this.eventRepository
      .createQueryBuilder()
      .relation(Event, 'participants')
      .of(eventId)
      .remove({id: userId}); // need to set id explicitly due to a bug in typeorm

    return await this.eventRepository.findOneOrFail(eventId, {cache: false});
  }

  public async update(eventId: number, updatedFields: Partial<Event>): Promise<Event> {
    await this.eventRepository.update(eventId, updatedFields);

    return await this.eventRepository.findOneOrFail(eventId, {cache: false});
  }
}

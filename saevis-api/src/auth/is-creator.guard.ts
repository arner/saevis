import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import {Connection} from 'typeorm';
import { Reflector } from '@nestjs/core';
import {InjectConnection} from '@nestjs/typeorm';
import {CreatedEntity} from '../created.entity';

@Injectable()
export class IsCreator implements CanActivate {
  constructor(
    private readonly reflector: Reflector,

    @InjectConnection()
    private connection: Connection
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const entityType = this.reflector.get<{ new(): CreatedEntity ;}>('entity', context.getHandler()) as { new(): CreatedEntity ;};
    if (!entityType) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const id = request.params['id'];

    const found = await this.connection.createEntityManager()
      .count(entityType, {where: {id, createdBy: {id: user.id}}});

    return found === 1;
  }
}

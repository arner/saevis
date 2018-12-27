import { ReflectMetadata } from '@nestjs/common';
import {CreatedEntity} from '../created.entity';

export const SubjectEntity = (entity: { new(): CreatedEntity ;}) => ReflectMetadata('entity', entity);

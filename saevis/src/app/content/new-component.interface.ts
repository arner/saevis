import {ItemComponent} from './item-component.interface';
import {Topic} from '../api/model/topic';

export interface NewComponent {
  save(): void;
  topic: Topic;
}

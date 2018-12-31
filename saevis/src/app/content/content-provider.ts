import {Content} from '../api/model/content';
import {ItemComponent} from './item-component.interface';
import {NewComponent} from './new-component.interface';

interface Components {
  preview: { new (...args: any[]): ItemComponent };
  content: { new (...args: any[]): ItemComponent };
  create: { new (...args: any[]): NewComponent };
}

export class ContentProvider {
  public readonly type: Content.TypeEnum;
  public readonly key: string;
  public readonly icon: string;
  public readonly title: string;
  public readonly description: string;
  public readonly components: Components;

  public constructor(data: ContentProvider) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

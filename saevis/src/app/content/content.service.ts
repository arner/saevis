import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {ContentProvider} from './content-provider';
import {contentProviders} from './content-providers';
import {Content} from '../api/model/content';
import {ItemComponent} from './item-component.interface';
import {NzModalService} from 'ng-zorro-antd';
import {Topic} from '../api/model/topic';
import {DefaultService} from '../api/api/default.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: NzModalService,
    private api: DefaultService) { }

  public getProviders(): ContentProvider[] {
    return contentProviders;
  }

  public getProvider(type: Content.TypeEnum): ContentProvider {
    return this.getProviders().find(provider => provider.type === type);
  }

  private getActualContent(content: Content): any {
    const key = this.getProvider(content.type).key;

    return content[key];
  }

  public showNewModal(type: Content.TypeEnum, parentTopic: Topic): void {
    const provider = this.getProvider(type);
    const component = provider.components.create;

    const modal = this.modalService.create({
      nzTitle: provider.title,
      nzContent: component,
      nzComponentParams: {
        topic: parentTopic
      },
      nzFooter: [{
        label: 'Save',
        onClick: (componentInstance) => {
          componentInstance.save();
        }
      }]
    });

    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

    // Return a result when closed
    modal.afterClose.subscribe((result) => console.log('[afterClose] The result is:', result));

    // modal.getContentComponent();
  }

  public loadPreviewComponent(content: Content, viewContainerRef: ViewContainerRef): void {
    const component = this.getProvider(content.type).components.preview;

    return this.loadComponent(content, viewContainerRef, component);
  }

  public loadContentComponent(content: Content, viewContainerRef: ViewContainerRef): void {
    const component = this.getProvider(content.type).components.content;

    return this.loadComponent(content, viewContainerRef, component);
  }

  private loadComponent(content: Content, viewContainerRef: ViewContainerRef, component: any, ): void {
    if (!component) {
      console.warn('Provider not found');

      return;
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<ItemComponent> componentRef.instance).item = this.getActualContent(content);
  }
}

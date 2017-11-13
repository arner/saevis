import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {BlockExtended, BlockMode, BlockFactory, ContentTypeString} from '../';
import {BlockComponentInterface} from '../block.component';

@Component({
  selector: 'saevis-full-block',
  templateUrl: './full-block.component.html',
  styleUrls: ['./full-block.component.scss']
})
export class FullBlockComponent {

  @Input()
  public block: BlockExtended<any>;
  public BlockMode = BlockMode;
  public actions = new EventEmitter<string>();

  @Output()
  public destroy: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('blockContainer', { read: ViewContainerRef })
  public container: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver
  ) { }

  private blockComponent: ComponentRef<BlockComponentInterface>;

  ngOnInit() {
    this.createComponent();
  }

  public edit() {
    this.block.edit();
    this.blockComponent.instance.mode = this.block.mode;
  }

  private createComponent() {
    this.container.clear();
    const component = BlockFactory.getComponent(<ContentTypeString>this.block.blockContentType);
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
    this.blockComponent = this.container.createComponent(factory);
    this.setFields(this.blockComponent.instance);
  }

  private setFields(instance: BlockComponentInterface) {
    instance.content = this.block.blockContent;
    instance.actions = this.actions;
    instance.destroy = this.destroy;
    instance.mode = this.block.mode;
    instance.modeChange.subscribe((mode: BlockMode) => {
      this.block.mode = <BlockMode>mode;
    });
  }
}

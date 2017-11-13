import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {BlockExtended, BlockMode, BlockFactory} from '../';
import {ContentTypeString} from '../instances/config';
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

  private blockComponent: ComponentRef<BlockComponentInterface>;

  constructor(
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.createComponent();
  }

  public edit() {
    this.block.edit();
    this.blockComponent.instance.mode = this.block.mode;
  }

  public get menuButtonVisible(): boolean {
    return this.block.mode === BlockMode.NORMAL && (this.block.blockContent.canEdit || this.block.blockContent.canDelete);
  }

  private createComponent() {
    this.container.clear();
    const component = BlockFactory.getComponent(<ContentTypeString>this.block.blockContentType);
    const factory = this.resolver.resolveComponentFactory(component);
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

import {EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseLoopBackApi, BlockInterface, LoopBackAuth} from '../sdk';
import {ActionButton, BlockContentInterface, BlockMode} from './';

export interface BlockComponentInterface {
  actions: EventEmitter<string>;
  content: BlockContentInterface;
  mode: BlockMode;
  modeChange: EventEmitter<BlockMode>;
  allowedActions: ActionButton[];
  destroy: EventEmitter<void>;
}

export abstract class BlockComponent<T extends BlockInterface> implements OnInit {
  public userId: number;
  public BlockMode = BlockMode;

  protected abstract api: BaseLoopBackApi;
  protected abstract normalActions: ActionButton[];
  protected get editActions(): ActionButton[] {
    return [
      {
        name: 'save',
        text: 'Opslaan',
        fn: this.update,
      },
      {
        name: 'cancel',
        text: 'Annuleren',
        fn: this.cancelEditing
      }
    ];
  }
  protected get newActions(): ActionButton[] {
    return [
      {
        name: 'create',
        text: 'Opslaan',
        fn: this.create,
      },
      {
        name: 'remove',
        text: 'Annuleren',
        fn: this.remove
      }
    ];
  }

  public get allowedActions(): ActionButton[] {
    switch (this.mode) {
      case BlockMode.NORMAL: return this.normalActions;
      case BlockMode.NEW: return this.newActions;
      case BlockMode.EDIT: return this.editActions;
      default: throw new Error ('Unknown mode.');
    }
  }

  @Input()
  public content: T;

  @Input()
  public get mode() {
    return this._mode;
  }

  @Output()
  public modeChange = new EventEmitter();

  public set mode(val) {
    this._mode = val;
    this.modeChange.emit(this.mode);

    if (this.mode === BlockMode.EDIT) {
      this.previousContent = new this.contentType(this.content);
    }
  }

  @Input()
  public actions: EventEmitter<string>;

  @Output()
  public destroy: EventEmitter<void>;

  private _mode: BlockMode;
  private previousContent: T;

  ngOnInit() {
    this.actions.subscribe((action: string) => {
      try {
        this.allowedActions.find((a) => a.name === action).fn.apply(this);
      } catch (err) {
        console.error('Action', action, 'does not exist');
      }
    });
  }

  constructor(private contentType: any, protected auth: LoopBackAuth) {
    this.userId = this.auth.getCurrentUserId();
  }

  protected cancelEditing() {
    this.content = new this.contentType(this.previousContent);
    this.mode = BlockMode.NORMAL;
  }

  protected save() {
    if (this.mode === BlockMode.NEW) {
      delete this.content.id;
      this.create();
    } else {
      this.update();
    }
  }

  protected create() {
    delete this.content.id;
    this.api.create(this.content).subscribe(
      (data: any) => this.onSaveSuccess(data),
      (err: Error) => this.onSaveError(err)
    );
  }

  protected update() {
    this.api.updateAttributes(this.content.id, this.content).subscribe(
      (data: any) => this.onSaveSuccess(data),
      (err: Error) => this.onSaveError(err)
    );
  }

  protected remove() {
    this.destroy.emit();
  }

  protected onSaveSuccess(data: any) {
    console.log('Saved', data.id);
    this.mode = BlockMode.NORMAL;
    this.content = new this.contentType(data);
  }

  protected onSaveError(err: Error) {
    console.error('Error saving.', err.message);
  }
}

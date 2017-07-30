export interface BlockContentInterface {
//  constructor(data: any, options: BlockTextOptions): void;
  icon: string;
  canEdit: boolean;
  canDelete: boolean;
  value: number;
  getHasDone: (userId: number) => boolean;
  getShortText: (userId: number) => string;
  id: number;
}

export interface BlockTextOptions {
  userId: number
}

export interface ActionButton {
  text: string;
  name: string;
  fn: () => void;
}

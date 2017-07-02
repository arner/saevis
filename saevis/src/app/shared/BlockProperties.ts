export interface BlockProperties {
  icon: string;
  canEdit: boolean;
  canDelete: boolean;
  value: number;
  hasDone: (options: BlockTextOptions) => boolean;
  getText: (options: BlockTextOptions) => string;
}

export interface BlockTextOptions {
  userId: number
}

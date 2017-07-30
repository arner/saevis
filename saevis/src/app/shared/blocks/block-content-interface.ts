export interface BlockContentInterface {
//  constructor(data: any): void;
  icon: string;
  canEdit: boolean;
  canDelete: boolean;
  value: number;
  getHasDone: (userId: number) => boolean;
  getShortText: (userId: number) => string;
  id: number;
}

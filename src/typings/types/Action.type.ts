import { ActionType } from '../enums/ActionType.enum';

export type Action = {
  type: ActionType;
  payload?: any;
};

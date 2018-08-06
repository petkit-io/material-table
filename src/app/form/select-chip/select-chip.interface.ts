import {
  ISelectOptionItem,
} from '../select/select.interface';

export interface ISelectChip extends ISelectOptionItem {
  value: string | number;
  text: string;
  selected?: boolean;
  unaddable?: boolean;
  removable?: boolean;
}


import {
  ICompForm,
} from '../form.interface';
import {
  EditType
} from './edit.type';

export interface ICompEdit extends ICompForm {
  override: boolean;

  option: IEditOption;
}

export interface IEditOption {
  type?: EditType;
  editable?: boolean;
  override?: boolean;
  formOption?: any;
}


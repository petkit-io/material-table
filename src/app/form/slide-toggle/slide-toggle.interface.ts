import {
  Observable
} from 'rxjs/Rx';
import {
  ColorType
} from '../../style/type/color.type';
import {
  ICompForm,
} from '../form.interface';

export interface ICompSwitch extends ICompForm {
  name: string;
  color: ColorType;
  checked: boolean;
  disabled: boolean;
  disableRipple: boolean;
  required: boolean;
  text: Observable<string | string[]>;
}

export interface ISwitchOption {
  name?: string;
  color?: ColorType;
  checked?: boolean;
  disabled?: boolean;
  disableRipple?: boolean;
  required?: boolean;
  text?: Observable<string | string[]>;
}


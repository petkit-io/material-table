import {
  ColorType,
} from '../../style/type/color.type';

export interface IButtonOption {
  text: string;
  icon?: string;
  onClick?: Function;
  color?: ColorType;
  disabled?: boolean;
  disableRipple?: boolean;
}


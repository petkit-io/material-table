import {
  ICompForm,
} from '../form.interface';
import {
  InputType
} from './input.type';


export interface ICompInput extends ICompForm {
  placeholder: string;
  type: InputType;
  min: number;
  max: number;
}

export interface IInputOption {
  placeholder?: string;
  type?: InputType;
  min?: number;
  max?: number;
}


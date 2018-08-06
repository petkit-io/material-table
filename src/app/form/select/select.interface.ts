import {
  Observable
} from 'rxjs';
import {
  ICompForm,
} from '../form.interface';

export interface ICompSelect extends ICompForm {
  placeholder: string;
  options: Observable<ISelectOptionItem[]>;
}

export interface ISelectOption {
  placeholder: string;
  options: Observable<ISelectOptionItem[]>;
}

export interface ISelectOptionItem {
  value: any;
  text: string;
}


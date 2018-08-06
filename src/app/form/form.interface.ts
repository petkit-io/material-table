import {
  EventEmitter
} from '@angular/core';
import {
  ICompMaterial
} from '../material.interface';

export interface ICompForm extends ICompMaterial {
  value: any;
  valueChange: EventEmitter<any>;
  textChange: EventEmitter<any>;
}

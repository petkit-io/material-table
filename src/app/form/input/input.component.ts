import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  InputType
} from './input.type';
import {
  ICompInput,
  IInputOption,
} from './input.interface';

// lx:todo
// prefix, suffix, input type
// input
@Component({
  selector: 'mat-input-ext',
  templateUrl: './input.component.html',
})
export class InputComponent implements OnInit, ICompInput {
  @Input()
  placeholder: string;
  @Input()
  type: InputType;
  @Input()
  min: number;
  @Input()
  max: number;

  @Input()
  option: IInputOption;

  // two-way binding
  private valueValue: string;
  @Output() valueChange = new EventEmitter();
  @Input() get value() {
    return this.valueValue;
  }
  set value(val) {
    if (val !== this.valueValue) {
      this.valueChange.emit(val);
      this.valueValue = val;

      this.setText(val);
    }
  }

  _text: string;
  @Output()
  textChange = new EventEmitter<string>();

  getText(value) {
    return value;
  }

  ngOnInit() {
    this.initOption();
  }

  initOption() {
    if (this.option) {
      if (this.option.type) {
        this.type = this.option.type;
      }
      if (this.option.placeholder) {
        this.placeholder = this.option.placeholder;
      }
      if (this.option.min) {
        this.min = this.option.min;
      }
      if (this.option.max) {
        this.max = this.option.max;
      }
    }
  }

  setText(text) {
    this._text = text;
    this.textChange.emit(text);
  }
}

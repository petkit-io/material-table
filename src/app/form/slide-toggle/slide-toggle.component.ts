import {
  Observable,
} from 'rxjs/Rx';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import {
  ColorType,
} from '../../style/type/color.type';
import {
  ICompSwitch,
  ISwitchOption,
} from './slide-toggle.interface';

// switch
@Component({
  selector: 'mat-slide-toggle-ext',
  templateUrl: './slide-toggle.component.html',
})
export class SlideToggleComponent implements OnInit, ICompSwitch {
  @Input()
  name: string;
  @Input()
  color: ColorType;
  @Input()
  checked: boolean;
  @Input()
  disabled: boolean;
  @Input()
  disableRipple: boolean;
  @Input()
  required: boolean;
  @Input()
  text: Observable<string | string[]>;

  @Input()
  option: ISwitchOption;

  private valueValue: boolean;
  @Output()
  valueChange = new EventEmitter();
  @Input()
  get value() {
    return this.valueValue;
  }
  set value(val: boolean) {
    if (val !== this.valueValue) {
      this.valueValue = val;
      this.valueChange.emit(val);
      this.setText(val, this._textData);
    }
  }

  @Output() textChange = new EventEmitter<string>();

  private _textData: string | string[] = '';
  _text: string;

  getText(value) {
    let _text: string;
    if (Array.isArray(this._textData)) {
      _text = this._textData[Number(value) || 0];
    } else {
      _text = this._textData || '';
    }
    return _text;
  }

  ngOnInit() {
    this.initOption();

    if (this.text) {
      this.text.subscribe(text => {
        this._textData = text;
        this.setText(this.value, text);
      });
    }
  }

  initOption() {
    if (this.option) {
      if (this.option.checked) {
        this.checked = this.option.checked;
      }
      if (this.option.color) {
        this.color = this.option.color;
      }
      if (this.option.disabled) {
        this.disabled = this.option.disabled;
      }
      if (this.option.disableRipple) {
        this.disableRipple = this.option.disableRipple;
      }
      if (this.option.name) {
        this.name = this.option.name;
      }
      if (this.option.required) {
        this.required = this.option.required;
      }
      if (this.option.text) {
        this.text = this.option.text;
      }
    }
  }

  setText(value, textData) {
    if (Array.isArray(textData)) {
      this._text = textData[Number(value) || 0];
    } else {
      this._text = textData || '';
    }

    this.textChange.emit(this._text);
  }
}

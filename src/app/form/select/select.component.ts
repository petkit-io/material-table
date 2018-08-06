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
  ICompSelect,
  ISelectOption,
  ISelectOptionItem
} from './select.interface';


// select
@Component({
  selector: 'mat-select-ext',
  templateUrl: './select.component.html',
})
export class SelectComponent implements OnInit, ICompSelect {
  @Input()
  placeholder: string;
  @Input()
  options: Observable<ISelectOptionItem[]>;

  @Input()
  option: ISelectOption;

  private valueValue;
  @Output()
  valueChange = new EventEmitter<any>();
  @Input()
  get value() {
    return this.valueValue;
  }
  set value(val) {
    if (val !== this.valueValue) {
      this.valueValue = val;
      this.valueChange.emit(val);

      this.setText(this._options, val);
    }
  }

  @Output()
  textChange = new EventEmitter<string>();
  @Output()
  optionClick = new EventEmitter<ISelectOptionItem>();

  valueKey: any = 'value';
  textKey: any = 'text';

  private _optionsData: any[] = [];
  get _options() {
    return this._optionsData;
  }
  set _options(val) {
    this._optionsData = val;

    this.setText(val, this.value);
  }

  _text: string;
  getText(value) {
    const selectedOption = this._options.find(option => option.value === value);
    if (selectedOption) {
      return selectedOption.text;
    }
    return '';
  }

  ngOnInit() {
    this.initOption();

    if (this.options) {
      this.options.subscribe(options => this._options = options);
    }
  }

  initOption() {
    if (this.option) {
      if (this.option.placeholder) {
        this.placeholder = this.option.placeholder;
      }
      if (this.option.options) {
        this.options = this.option.options;
      }
    }
  }

  setText(options, value) {
    const selectedOption = options.find(option => option.value === value);
    if (selectedOption) {
      this.textChange.emit(selectedOption.text);
    }
  }

  onOptionClick(option) {
    this.optionClick.emit(option);
  }
}

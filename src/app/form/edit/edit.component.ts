import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  forwardRef,
  ViewChild,
} from '@angular/core';
import {
  EditType
} from './edit.type';
import {
  ICompEdit,
  IEditOption,
} from './edit.interface';
import {
  InputComponent,
} from '../input/input.component';
import {
  SelectComponent
} from '../select/select.component';
import {
  SlideToggleComponent,
} from '../slide-toggle/slide-toggle.component';


// edit
@Component({
  selector: 'mat-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit, ICompEdit {
  @Input()
  type: EditType;
  @Input()
  override = true;
  @Input()
  formOption: any;

  private _editable;
  @Input()
  get editable() {
    return this._editable;
  }
  set editable(val) {
    if (val !== this._editable) {
      this._editable = val;

      if (this.override) {
        setTimeout(() => {
          if (this.editable) {
            this.formValue = this.value;
          } else {
            this.value = this.formValue;
          }
        }, 0);
      }
    }
  }

  @Input()
  option: IEditOption;

  private valueValue;
  @Output() valueChange = new EventEmitter<any>();
  @Input()
  get value() {
    return this.valueValue;
  }
  set value(val) {
    if (val !== this.valueValue) {
      this.valueValue = val;
      this.valueChange.emit(val);

      setTimeout(() => {
        this.setText(val);
      }, 0);
    }
  }

  private formValueValue;
  @Output() formValueChange = new EventEmitter<any>();
  @Input()
  get formValue() {
    return this.formValueValue;
  }
  set formValue(val) {
    if (val !== this.formValueValue) {
      this.formValueValue = val;
      this.formValueChange.emit(val);
    }
  }

  @Output()
  textChange = new EventEmitter<string>();

  @ViewChild(forwardRef(() => InputComponent))
  compInput: InputComponent;
  @ViewChild(forwardRef(() => SlideToggleComponent))
  compSlideToggle: SlideToggleComponent;
  @ViewChild(forwardRef(() => SelectComponent))
  compSelect: SelectComponent;

  _text: string;

  getText(value) {
    let _text = '';
    const _type = this.type || this.option.type;
    switch (_type) {
      case 'select':
        _text = this.compSelect.getText(value);
        break;
      case 'slide-toggle':
        _text = this.compSlideToggle.getText(value);
        break;
      case 'input':
        _text = this.compInput.getText(value);
        break;
    }
    return _text;
  }

  ngOnInit() {
    this.initOption();
  }

  initOption() {
    if (this.option) {
      if (this.option.type) {
        this.type = this.option.type;
      }
      if (this.option.formOption) {
        this.formOption = this.option.formOption;
      }
      if (this.option.override) {
        this.override = this.option.override;
      }
      if (this.option.editable) {
        this.editable = this.option.editable;
      }
    }
  }

  setText(value) {
    const _text = this.getText(value);
    this._text = _text;
    this.textChange.emit(_text);
  }
}

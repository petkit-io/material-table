import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import {
  BsLocaleService,
} from 'ngx-bootstrap/datepicker';
import {
  Align,
  DateType,
} from './date-range.type';
import {
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';


// date
@Component({
  selector: 'bs-date-range',
  templateUrl: './date-range.component.html',
})
export class DateRangeComponent implements OnInit, OnDestroy {
  @Input()
  placeholder: string;
  @Input()
  bsConfig: BsDatepickerConfig;
  @Input()
  align: Align = 'right';
  @Input()
  type: DateType = 'range';

  private _value: Date | Date[];
  @Output()
  valueChange: EventEmitter<Date | Date[]> = new EventEmitter<Date | Date[]>();
  @Input()
  get value() {
    return this._value;
  }
  set value(val) {
    if (val !== this._value) {
      this._value = val;
      this.valueChange.emit(val);
    }
  }

  constructor(
    private _localeService: BsLocaleService,
  ) {
    this._localeService.use('zh-cn');
  }
  ngOnInit() {
    const bsConfig = {
      dateInputFormat: 'YYYY-MM-DD',
      containerClass: 'theme-blue component-date__container',
    };

    if (this.align === 'right') {
      bsConfig.containerClass = `${bsConfig.containerClass} component-date__container--right`;
    }

    this.bsConfig = {
      ...bsConfig,
      ...this.bsConfig,
    };
  }
  ngOnDestroy() {
  }
}

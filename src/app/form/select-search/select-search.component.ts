import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormControl,
} from '@angular/forms';
import {
  Observable,
  of,
} from 'rxjs';
import {
  combineLatest,
  debounceTime,
  map,
} from 'rxjs/operators';
import {
  ISelectOptionItem
} from '../select/select.interface';

// select search
@Component({
  selector: 'mat-select-search',
  templateUrl: './select-search.component.html',
})
export class SelectSearchComponent implements OnInit, OnDestroy {
  // 是否开启多选
  @Input()
  multiple = false;
  // 默认占位字符串
  @Input()
  placeholder = '选择';
  // 下拉数据
  @Input()
  data: Observable<ISelectOptionItem[]> = of([]);

  private _value;
  // 数据变化事件
  @Output()
  valueChange = new EventEmitter<any>();
  @Input()
  // 双向绑定value
  get value() {
    return this._value;
  }
  set value(val) {
    if (val !== this._value) {
      this._value = val;
      this.valueChange.emit(val);
    }
  }

  search = new FormControl();
  searchValue = '';


  options: any[];

  constructor() {
  }

  ngOnInit() {
    this.search.valueChanges.pipe(
      combineLatest(this.data),
      debounceTime(50),
      map(([search, data]) => {
        search = search || '';
        return data.filter(option => {
          return option.text.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
      }),
    ).subscribe(options => {
      this.options = options;
    });
  }

  ngOnDestroy() {
  }
}

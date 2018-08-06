import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  ElementRef,
  ViewChild,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  COMMA,
  ENTER,
} from '@angular/cdk/keycodes';
import {
  FormControl,
} from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatAutocompleteTrigger,
} from '@angular/material';
import {
  isArray,
  isEqual,
  orderBy,
} from 'lodash-es';
import {
  Observable,
  of,
  BehaviorSubject,
  Subscription,
} from 'rxjs';
import {
  map,
  startWith,
  combineLatest,
} from 'rxjs/operators';

import {
  ISelectChip,
} from './select-chip.interface';

/**
 * 下拉多选组件
 */
@Component({
  selector: 'mat-select-chip',
  templateUrl: './select-chip.component.html',
  styleUrls: ['./select-chip.component.scss']
})
export class SelectChipComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  placeholder = '';
  @Input()
  class = '';
  @Input()
  style = '';
  @Input()
  selectable = true;
  @Input()
  removable = true;
  @Input()
  addable = true;
  @Input()
  addOnBlur = false;
  @Input()
  separatorKeysCodes = [ENTER, COMMA];

  @Input()
  data: Observable<ISelectChip[]> = of([]);

  @Output()
  chipClick: EventEmitter<ISelectChip> = new EventEmitter();
  @Output()
  chipRemove: EventEmitter<ISelectChip> = new EventEmitter();
  @Output()
  chipAdd: EventEmitter<ISelectChip> = new EventEmitter();

  _chips: (string | number)[] = [];
  @Input()
  // chips: (string | number)[] = [];
  get chips(): (string | number)[] {
    return this._chips;
  }
  set chips(chips: (string | number)[]) {
    if (!isEqual(this._chips, chips) && isArray(chips)) {
      this._chips = chips;
      this.chipsChange.emit(chips);
    }
  }
  @Output()
  chipsChange: EventEmitter<(string | number)[]> = new EventEmitter();

  chipData: ISelectChip[] = [];
  originData: ISelectChip[] = [];

  autoCompleteData: Observable<any[]>;

  inputCtrl = new FormControl();
  @ViewChild('filterInput') filterInput: ElementRef;
  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;


  private _subs: Subscription[] = [];

  constructor() {
  }

  ngOnInit() {
    this._initData();

    if (!this.addable) {
      this.filterInput.nativeElement.style.opacity = 0;
    }
  }

  ngOnDestroy() {
    this._subs.forEach(sub => sub.unsubscribe());
  }

  ngOnChanges(changes) {
    const {
      data,
      chips,
    } = changes;

    if (data) {
      const {
        currentValue,
      } = data;

      this.data = currentValue;
    }

    if (chips) {
      const {
        currentValue,
      } = chips;

      this.chips = chips;
    }

    this._initData();
  }

  add(event: MatChipInputEvent): void {}

  remove(chip: ISelectChip): void {
    const index = this.chipData.indexOf(chip);

    if (index >= 0) {
      this.chipData[index].selected = false;
      this.chipData.splice(index, 1);
      this.chips = this.chipData.map(_chip => _chip.value);

      this.chipRemove.emit(chip);
    }

    // 重置搜索，让被移除的chip可以被搜索到
    this.inputCtrl.setValue(this.filterInput.nativeElement.value);
  }

  onOptionSelected(value: string | number): void {
    const selectedOption = this.originData.find(row => row.value === value);

    if (selectedOption) {
      selectedOption.selected = true;
      this.chipData.push(selectedOption);
      this.chipAdd.emit(selectedOption);
      this.chips = this.chipData.map(_chip => _chip.value);
    }

    this.inputCtrl.setValue('');
    this.filterInput.nativeElement.value = '';
    this.filterInput.nativeElement.blur();
  }

  onClickChip(chip) {
    this.chipClick.emit(chip);
  }

  onFocusInput() {
    if (this.addable) {
      this.trigger.openPanel();
    }
  }

  private _initData() {
    this._subs.push(this.data.subscribe(data => {
      this.chipData = [];
      this.chips.forEach(chip => {
        data.forEach(v => {
          if (v.value === chip) {
            v.selected = true;
            this.chipData.push(v);
          }
        });
      });
      this.chipData = orderBy(this.chipData, 'removable', 'asc');
      this.originData = data;

      this.autoCompleteData = this.inputCtrl.valueChanges.pipe(
        startWith(''),
        map((filterText) => this._filterAutoComplete('' + filterText)),
      );
    }));
  }

  private _filterAutoComplete(filterText: string) {
    const filterdData = this.originData
      .filter(row => !row.unaddable)
      .filter(row => !row.selected)
      .filter(row => row.text.toLowerCase().indexOf((filterText || '').toLowerCase()) > -1);

    return filterdData;
  }
}


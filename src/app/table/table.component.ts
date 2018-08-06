import {
  combineLatest,
  map,
  filter,
  debounceTime,
} from 'rxjs/operators';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  OnDestroy,
  Output,
  OnChanges,
} from '@angular/core';
import {
  CellMatchRuleType,
  SearchArray,
} from '../../lib/search-array';
import {
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault
} from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import {
  FormControl
} from '@angular/forms';
import {
  DataSource
} from '@angular/cdk/collections';
import {
  PageEvent
} from '@angular/material';
import {
  isFunction,
  isArray,
  orderBy,
} from 'lodash-es';
import {
  BehaviorSubject,
  of,
} from 'rxjs';
import {
  Observable,
  Subscription,
} from 'rxjs';
import * as XLSX from 'xlsx';
import moment from 'moment-es6';

import {
  ICompTableOption,
  TableColDefType,
  ITableCalcOption,
  ITableColDefOption,
  ITableSortOption,
} from './option';
import {
  CompTableState,
  CompTableStateChange,
  ICompTableState,
  ICompTableStateChange,
  PaginatorState,
  PaginatorStateChange,
  TableState,
  TableStateChange,
  ICompPagingState,
} from './state/comp.state';
import {
  ISelectOptionItem,
} from '../form/select/select.interface';


/**
 * Table组件
 *
 * 基于angular原生material组件的扩展
 */
@Component({
  selector: 'mat-table-ext',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  option: ICompTableOption;
  @Input()
  state: BehaviorSubject<ICompTableState<any>> = new BehaviorSubject<ICompTableState<any>>(new CompTableState<any>());
  @Output()
  stateChange: EventEmitter<ICompTableStateChange> = new EventEmitter();
  @Input()
  pagingState: Observable<ICompPagingState<any>>;

  private searchValueValue;
  @Output()
  searchValueChange = new EventEmitter<any>();
  @Input()
  get searchValue() {
    return this.searchValueValue;
  }
  set searchValue(val) {
    if (val !== this.searchValueValue) {
      this.searchValueValue = val;
      this.searchValueChange.emit(val);

      this.onSearchValueChange(val);
    }
  }

  // ------------------ value changes ------------------
  changes: BehaviorSubject<ICompTableStateChange> = new BehaviorSubject<ICompTableStateChange>(new CompTableStateChange());

  // ------------------ 数据绑定 ------------------
  /**
   * MatTable数据
   */
  dataSource: TableDataSource<any>;
  // MatTable
  allColumns: Observable<ISelectOptionItem[]>;
  displayedColumns: string[];


  // constant
  _TableColDefType;
  _isFunction = isFunction;

  private _rx: Subscription[] = [];
  private _wb: XLSX.WorkBook = XLSX.utils.book_new();
  public _pagingData = [];
  public _filteredData = [];

  constructor(
    @Inject(DomSanitizer) public sanitizer: DomSanitizer
  ) {
    this._TableColDefType = TableColDefType;
  }

  ngOnInit() {
    this._initColumns();
    this._initSearch();
    this._initData();
    this._initPaging();
    this._initOption();
  }

  /**
   * 初始化表格列数据
   */
  private _initColumns(): void {
    const allColumns = this.option.table.colDef.map(v => ({
      value: v.col,
      text: v.header,
    }));
    const displayedColumns = this.option.table.colDef.filter(v => !v.hidden).map(v => v.col);

    const select = this.option.table.select;
    if (!select.disabled) {
      allColumns.unshift({
        value: select.col,
        text: select.header,
      });

      if (!select.hidden) {
        displayedColumns.unshift(select.col);
      }
    }

    this.allColumns = of(allColumns);
    this.displayedColumns = displayedColumns;
  }
  /**
   * 初始化搜索
   */
  private _initSearch(): void {
    /**
     * 响应:搜索、 翻页
     */
    this._rx.push(this.changes.pipe(
      debounceTime(256),
    ).subscribe((state: ICompTableStateChange) => {
      this.stateChange.emit(state);
    }));
  }
  /**
   * 初始化数据
   */
  private _initData(): void {
    this.dataSource = new TableDataSource({
      data: this.state.pipe(map((state: ICompTableState<any>) => state.table.data)),
      calc: this.option.table.calc,
    });
  }
  /**
   * 初始化分页
   */
  private _initPaging(): void {
    if (this.pagingState) {
      this.paging();
    }
  }
  /**
   * 初始化option配置
   */
  private _initOption(): void {
  }

  ngOnChanges(changes) {
    const {
      pagingState,
    } = changes;

    if (pagingState) {
      const {
        currentValue: value,
      } = pagingState;

      this.pagingState = value;
      this.paging();
    }
  }

  public resetSelected(): void {
    const col = this.option.table.select.col;
    this._pagingData.forEach(row => row[col] = false);
  }
  onClickSelectableRow({
    row,
  }) {
    const select = this.option.table.select;
    const col = select.col;
    if (select.multiple) {
      row[col] = !row[col];
    } else {
      this.resetSelected();
      row[col] = true;
    }
  }

  onClickSort({
    col,
    event,
  }: {
    col: ITableColDefOption,
    event: MouseEvent,
  }) {
    const exist = this.option.table.sort[col.col] !== undefined;

    if (exist) {
      this.option.table.sort[col.col] = this.option.table.sort[col.col] === 'asc' ? 'desc' : 'asc';

      if (!(event.metaKey || event.ctrlKey)) {
        this.option.table.sort = {
          [col.col]: this.option.table.sort[col.col],
        };
      }
    } else {
      if (event.metaKey || event.ctrlKey) {
        this.option.table.sort[col.col] = 'asc';
      } else {
        this.option.table.sort = {
          [col.col]: 'asc',
        };
      }
    }

    this.onSortChange();
  }

  // ---------------------------- export excel ----------------------------
  private _getDataColDef() {
    return this.option.table.colDef.filter(v => (v.type === TableColDefType.DEFAULT || v.type === TableColDefType.EDIT));
  }
  onClickExportExcelAll() {
    this.exportExcel(this._filteredData);
  }
  exportExcel(data: any[]) {
    // 列定义
    const exportColDefs = this._getDataColDef();
    // 导出列
    const exportCols = exportColDefs.map(v => v.col);
    // 标题行
    const exportHeader = exportColDefs.map(v => v.header);
    // table 数据
    // const exports = data.map(v => Object.keys(v).filter(col => exportCols.indexOf(col) > -1).map(key => v[key]));
    const exports = data.map(
      v => exportColDefs.map(
        colDef => colDef.type === TableColDefType.EDIT ? v[`_${colDef.col}TextValue`] : v[colDef.col]
      )
    );
    exports.unshift(exportHeader);

    let date = '';
    let dateState = this.changes.value.addon.date;
    if (isArray(dateState)) {
      dateState = dateState as Date[];

      if (dateState.length === 2 && this.option.addon.exports.all.withDate) {
        date = ` ${moment(dateState[0]).format('YYYY.MM.DD')}-${moment(dateState[1]).format('YYYY.MM.DD')}`;
      }
    } else {
      dateState = dateState as Date;
      date = ` ${moment(dateState).format('YYYY.MM.DD')}`;
    }


    this.appendSheet(exports, {
      title: this.option.addon.exports.all.title + date,
      sheetName: this.option.addon.exports.all.sheetName + date,
    });

    this.writeExcel(`${this.option.addon.exports.all.filename}${date}.xlsx`);
  }


  appendSheet(aoaData, {
    title = '',
    sheetName = '',
  } = {}) {
    let titleMerge, dateMerge;
    let colSpanAll = 0;

    if (aoaData[0]) {
      colSpanAll = aoaData[0].length - 1;
    }

    dateMerge = {
      s: {
        r: 1,
        c: 0
      },
      e: {
        r: 1,
        c: colSpanAll
      }
    };
    aoaData.unshift(['导出时间：' + moment().format('YYYY.MM.DD HH:mm:SS')]);

    // 设置title
    if (title) {
      titleMerge = {
        s: {
          r: 0,
          c: 0,
        },
        e: {
          r: 0,
          c: colSpanAll,
        },
      };
      aoaData.unshift([title]);
    } else {
      dateMerge = {
        s: {
          r: 0,
          c: 0
        },
        e: {
          r: 0,
          c: colSpanAll
        }
      };
    }

    // 设置sheet名
    sheetName = sheetName || title || 'sheet';

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoaData);

    if (!ws['!merges']) {
       ws['!merges'] = [];
    }
    if (titleMerge) {
      ws['!merges'].push(titleMerge);
    }
    ws['!merges'].push(dateMerge);

    XLSX.utils.book_append_sheet(this._wb, ws, sheetName.slice(0, 31));
  }
  writeExcel(filename = '') {
    if (!filename) {
      filename = this.option.addon.title || 'export.xlsx';
    }

    XLSX.writeFile(this._wb, filename);
  }
  // ---------------------------- export excel ----------------------------



  // ---------------------------- paging ----------------------------
  paging() {
    const searchArray = new SearchArray<any>();

    this._rx.push(this.pagingState.pipe(
      combineLatest(this.changes),
      filter(([pagingState, stateChange]) => pagingState && isArray(pagingState.data)),
    ).subscribe(([pagingState, stateChange]) => {
      const data = pagingState.data;

      searchArray.setData(data);

      stateChange.table.search.forEach(s => {
        searchArray.filter(s);
      });
      const filters = this.option.addon.filters.filter(filter => {
        return !!filter.col;
      }).map(filter => {
        const search = filter.value;

        if (search === '' || search === undefined || search === null) {
          return;
        }

        if (isArray(search)) {
          searchArray.multiFilter(search, {
            cols: [{
              col: filter.col,
              type: CellMatchRuleType.FULL,
            }],
            rows: [{
              cols: [filter.col],
            }]
          });
        } else {
          searchArray.filter(search);
        }

      });

      const sort = this.option.table.sort;
      const searchedData = orderBy(searchArray.filterData, Object.keys(sort), (<any>Object).values(sort));

      this._pagingData = searchedData;
      this._filteredData = searchedData;

      const value = this.state.value;
      const index = stateChange.paginator.index;
      const size = stateChange.paginator.size;
      value.paginator.length = searchedData.length;
      value.table.data = searchedData.slice(index * size, (index + 1) * size);
      this.state.next(value);
    }));
  }
  // ---------------------------- paging ----------------------------


  // ---------------------------- state change ----------------------------
  onPageChange(event: PageEvent) {
    const value = this.changes.value;
    value.paginator.index = event.pageIndex;
    value.paginator.size = event.pageSize;

    this.changes.next(value);
  }
  onSearchValueChange(searchValue) {
    const value = this.changes.value;
    value.table.search = searchValue && searchValue.trim().split(' ').filter(v => !!v) || [''];
    this.changes.next(value);
  }
  onDateChange(date) {
    console.log(date);

    const value = this.changes.value;
    value.addon.date = date;
    this.changes.next(value);

    if (isFunction(this.option.addon.date.valueChange)) {
      this.option.addon.date.valueChange(date);
    }
  }
  onFiltersChange(callback, value) {
    const _value = this.changes.value;
    _value.addon.filters = this.option.addon.filters.map(filter => filter.value);
    this.changes.next(_value);

    if (isFunction(callback)) {
      callback(value);
    }
  }
  onSortChange() {
    const _value = this.changes.value;
    this.changes.next(_value);
  }
  // ---------------------------- state change ----------------------------

  ngOnDestroy() {
    this._rx.map(sub => sub.unsubscribe());
  }

  get stateValue() {
    return this.changes.value;
  }

  get selectedValue() {
    return this._pagingData.filter(row => row[this.option.table.select.col]);
  }
}


/**
 * 订阅table数据和paginator页数的变化返回对应的数据
 */
export interface ITableDataSource<T> {
  data: Observable<T[]>;
  calc?: ITableCalcOption[];
}

export class TableDataSource<T> extends DataSource<any> {
  public calc: ITableCalcOption[];
  public data: Observable<T[]>;

  constructor({
    data,
    calc = [],
  }: ITableDataSource<T>) {
    super();

    this.calc = calc;
    this.data = data;
  }

  connect(): Observable<T[]> {
    return this.data.pipe(
      map(data => {
        if (this.calc.length > 0 && data.length > 0) {
          const keys = Object.keys(data[0]);
          const calcRow = {
            _isCalcRow: true,
          };
          keys.map(key => calcRow[key] = '');

          this.calc.map((calc: ITableCalcOption) => {
            const {
              col,
            } = calc;

            if (keys.indexOf(col) === -1) {
              return;
            }

            calcRow[col] = data.map(v => Number(v[col])).reduce((b, a) => b + a, 0).toFixed(2);
          });

          return data.concat([calcRow as any]);
        }

        return data;
      }),
    );
  }

  disconnect() { }
}

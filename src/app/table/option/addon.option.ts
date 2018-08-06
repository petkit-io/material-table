import moment from 'moment-es6';
import {
  Observable,
} from 'rxjs';
import {
  ISelectOptionItem,
} from '../../form/select/select.interface';
import {
  IInputOption,
  InputType,
} from '../../form';
import {
  IButtonOption,
} from '../../button';
import {
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';
import {
  DateType,
} from '../../date/date-range.type';

export interface IAddonOption {
  title: string;
  search: IAddonSearchOption;
  buttons: IButtonOption[];
  date: IAddonDateOption;
  exports: IAddonExportOption;
  filters: IAddonFiltersOption[];
}

export class AddonOption implements IAddonOption {
  title: string;
  search: IAddonSearchOption;
  buttons: IButtonOption[];
  date: IAddonDateOption;
  exports: IAddonExportOption;
  filters: IAddonFiltersOption[];

  constructor ({
    title = '',
    search = new AddonSearchOption(),
    buttons = [],
    date = new AddonDateOption(),
    exports = new AddonExportOption(),
    filters = [],
  } = {}) {
    this.title = title;
    this.search = search;
    this.buttons = buttons;
    this.date = date;
    this.exports = exports;
    this.filters = filters;
  }
}

export interface IAddonSearchOption extends IInputOption {
  hidden?:    boolean;
  disabled?:  boolean;
}

export class AddonSearchOption implements IAddonSearchOption {
  placeholder:  string;
  type: InputType;
  min: number;
  max: number;

  hidden:       boolean;
  disabled:     boolean;

  constructor ({
    placeholder = '搜索',
    type,
    min,
    max,
    hidden      = false,
    disabled    = false,
  }: IAddonSearchOption = {}) {
    this.placeholder = placeholder;
    this.type        = type;
    this.min         = min;
    this.max         = max;
    this.hidden      = hidden;
    this.disabled    = disabled;
  }
}

export interface IAddonDateOption {
  hidden?: boolean;
  value?: Date | Date[];
  type?: DateType;
  bsConfig?: BsDatepickerConfig;
  valueChange?: (date: Date[]) => void;
}

export class AddonDateOption implements IAddonDateOption {
  hidden: boolean;
  value: Date | Date[];
  type: DateType;
  bsConfig: BsDatepickerConfig;
  valueChange: (date: Date[]) => void;

  constructor ({
    value,
    hidden = true,
    type = 'range',
    bsConfig,
    valueChange = date => {},
  }: IAddonDateOption = {}) {
    if (!value) {
      if (type === 'range') {
        value = [
          moment().startOf('day').toDate(),
          moment().add(6, 'd').endOf('day').toDate(),
        ];
      } else if (type === 'picker') {
        value = moment().startOf('day').toDate();
      }
    }

    this.hidden = hidden;
    this.value = value;
    this.type = type;
    this.bsConfig = bsConfig;
    this.valueChange = valueChange;
  }
}


// ------------------- Export Option -------------------
export interface IAddonExportOption {
  hidden?: boolean;
  all?: IAddonExportAllOption;
}
export class AddonExportOption implements IAddonExportOption {
  hidden: boolean;
  all: IAddonExportAllOption;

  constructor ({
    hidden = false,
    all = new AddonExportAllOption(),
  }: IAddonExportOption = {}) {
    this.all = all;
    this.hidden = hidden;
  }
}
export interface IAddonExportAllOption {
  title?: string;
  sheetName?: string;
  filename?: string;
  withDate?: boolean;
}
export class AddonExportAllOption implements IAddonExportAllOption {
  title: string;
  sheetName: string;
  filename: string;
  withDate: boolean;

  constructor({
    title = '',
    sheetName = '',
    filename = 'export',
    withDate = true,
  }: IAddonExportAllOption = {}) {
    this.title = title;
    this.sheetName = sheetName || title || 'sheet';
    this.filename = filename;
    this.withDate = withDate;
  }
}

// ------------------- Filter Option -------------------
export interface IAddonFiltersOption {
  col?: string;
  hidden?: boolean;

  placeholder?: string;
  multiple?: boolean;
  value?: any;
  valueChange?: (value: any) => void;
  data: Observable<ISelectOptionItem[]>;
}
export class AddonFiltersOption implements IAddonFiltersOption {
  col?: string;
  hidden?: boolean;

  placeholder: string;
  multiple: boolean;
  value: any;
  valueChange: (value: string) => void;
  data: Observable<ISelectOptionItem[]>;

  constructor({
    col = '',
    hidden = false,

    placeholder = '筛选',
    multiple = true,
    value = '',
    valueChange = v => {},
    data,
  }: IAddonFiltersOption) {
    this.col = col;
    this.hidden = hidden;

    this.placeholder = placeholder;
    this.multiple = multiple;
    this.value = value;
    this.valueChange = valueChange;
    this.data = data;
  }
}



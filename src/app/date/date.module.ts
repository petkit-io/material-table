import {
  NgModule
} from '@angular/core';
import {
  CommonModule,
} from '@angular/common';
import {
  BsDatepickerModule
} from 'ngx-bootstrap/datepicker';
import {
  defineLocale
} from 'ngx-bootstrap/chronos';
import {
  zhCnLocale
} from 'ngx-bootstrap/locale';
import {
  MaterialBundleModule,
} from '../material-bundle.module';
import {
  DateRangeComponent,
} from './date-range.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialBundleModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    DateRangeComponent,
  ],
  exports: [
    DateRangeComponent,
  ],
})
export class DateModule {
  constructor() {
    defineLocale('zh-cn', zhCnLocale);
  }
}

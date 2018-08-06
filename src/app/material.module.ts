// @angular/material
import 'hammerjs';

import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
// formControl dep
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
// paginator language dep
import { MatPaginatorIntl } from '@angular/material';
// material design dep
import {
  MaterialBundleModule
} from './material-bundle.module';

// component
// form
import { InputComponent } from './form/input/input.component';
import { SelectComponent } from './form/select/select.component';
import { SelectSearchComponent } from './form/select-search/select-search.component';
import { EditComponent } from './form/edit/edit.component';
import { SlideToggleComponent } from './form/slide-toggle/slide-toggle.component';
import { SelectChipComponent } from './form/select-chip/select-chip.component';
// date
import {
  DateModule,
} from './date/date.module';
// table
import { TableComponent } from './table/table.component';
import { MatPaginatorIntlCro } from './table/table-lang.class';

@NgModule({
  imports: [
    MaterialBundleModule,
    CommonModule,
    ReactiveFormsModule,
    DateModule,
    FormsModule,
  ],
  declarations: [
    // from
    InputComponent,
    SelectComponent,
    SelectSearchComponent,
    SelectChipComponent,
    EditComponent,
    SlideToggleComponent,
    // table
    TableComponent,
  ],
  providers: [
    // table
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlCro
    },
  ],
  entryComponents: [
  ],
  exports: [
    MaterialBundleModule,
    // from
    InputComponent,
    SelectComponent,
    SelectSearchComponent,
    EditComponent,
    SlideToggleComponent,
    SelectChipComponent,
    // table
    TableComponent,
  ],
})
export class MaterialModule { }


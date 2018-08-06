import {
  Injectable,
} from '@angular/core';
import {
  MatPaginatorIntl
} from '@angular/material';


@Injectable()
export class MatPaginatorIntlCro extends MatPaginatorIntl {
  itemsPerPageLabel = '每页显示';
  nextPageLabel     = '下一页';
  previousPageLabel = '上一页';

  jjk = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 of ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} of ${length}`; }
}

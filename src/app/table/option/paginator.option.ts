import {
  CONSTANT
} from './table.type';

export interface IPaginatorOption {
  hidden?: boolean;

  index?: number;
  size?: number;
  sizeOptions?: number[];
}
export class PaginatorOption implements IPaginatorOption {
  hidden: boolean;

  index: number;
  size: number;
  sizeOptions: number[];

  constructor({
    hidden = false,

    index = CONSTANT.PAGINATOR.INDEX,
    size = CONSTANT.PAGINATOR.SIZE,
    sizeOptions = CONSTANT.PAGINATOR.SIZE_OPTIONS,
  }: IPaginatorOption = {}) {
    this.hidden = hidden;
    this.size = size;
    this.sizeOptions = sizeOptions;
    this.index = index;
  }
}


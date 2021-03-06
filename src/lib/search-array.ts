/**
 * 2017-11-02 11:14:24
 * @author liuxin
 * @description 数组的搜索扩展
 */
import {
  forEach,
  isObject,
  isArray,
} from 'lodash-es';

export enum CellMatchRuleType {
  // indexOf(value) > -1
  EXIST,
  // equal
  FULL,
}
export interface IColMatchRule {
  col: string;
  type: CellMatchRuleType;
}
export interface IRowMatchRule {
  // 所有cols中的列都命中，该行命中
  cols: string[];
}
export interface ISearchRule {
  cols?: IColMatchRule[];
  rows?: IRowMatchRule[];
}

export class SearchArray<T> {
  private _filterData: T[];
  private _multiFilterData: T[];

  constructor(public data: T[] = []) {
    this._filterData = data;
    this._multiFilterData = [];
  }

  setData(data: T[]) {
    this.data = data;
    this._filterData = data;
    this._multiFilterData = [];
    return this;
  }

  public filter(search: string, {
    cols,
    rows,
  }: ISearchRule = {}, multiple = false): T[] {
    const defaultSearchRule = this._getDefaultSearchRule();

    if (!cols || !rows) {
      if (!defaultSearchRule) {
        return;
      }
    }

    cols = cols || defaultSearchRule.cols;
    rows = rows || defaultSearchRule.rows;

    const filterData = this._filterData.filter(item => {
      const hitCols = cols.filter(colRule => {
        switch (colRule.type) {
          case CellMatchRuleType.FULL: {
            return String(item[colRule.col]) === search;
          }
          case CellMatchRuleType.EXIST:
          default:
            return (String(item[colRule.col])).toLowerCase().indexOf(search.toLowerCase()) > -1;
        }
      });

      return rows.filter(rowRule => {
        return rowRule.cols.filter(col => hitCols.find(hitCol => hitCol.col === col)).length === rowRule.cols.length;
      }).length > 0;
    });

    if (!multiple) {
      this._filterData = filterData;
    } else {
      this._multiFilterData.push(...filterData);
    }

    return multiple ? this._multiFilterData : this.filterData;
  }

  public multiFilter(search: string[], rule: ISearchRule) {
    if (search.length > 0) {
      search.forEach(v => {
        this.filter(String(v), rule, true);
      });

      this.endMultiFilter();
    }
  }

  public endMultiFilter() {
    this.setData(this.multiFilterData);
  }

  get filterData() {
    return this._filterData;
  }
  get multiFilterData() {
    return this._multiFilterData;
  }

  private _getDefaultSearchRule(): ISearchRule {
    const _data = this.data || [];

    if (!_data[0] || !isObject(_data[0])) {
      return null;
    }

    // 默认搜索所有列
    const cols = [];
    const rows = [];

    forEach(_data[0], (v, k) => {
      cols.push({
        col: k,
        type: CellMatchRuleType.EXIST,
      });
      rows.push({
        cols: [k],
      });
    });

    return {
      cols,
      rows,
    };
  }

}

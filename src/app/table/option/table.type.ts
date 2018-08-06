export enum TableColDefType {
  DEFAULT = 'TableColDefOption',
  EDIT    = 'TableEditColDefOption',
  OPT     = 'TableOptColDefOption',
  BTN_OPT = 'TableBtnOptColDefOption',
}

export const CONSTANT = {
  TABLE: {
    COL: {
      // opt列的默认col值
      OPT_DEF: 'opt',
      BTN_OPT_DEF: 'btnOpt',
    }
  },
  // paginator的默认配置值
  PAGINATOR: {
    INDEX: 0,
    SIZE: 10,
    SIZE_OPTIONS: [5, 10, 25, 100]
  }
};


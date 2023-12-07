import { Table as TableBase } from '@wemogy/reactbase';

const Table = TableBase.extendVariations({
  base: {
    borderRadius: 1,
    border: { custom: 1 },
    borderColor: 'grey200',
    header: {
      defaultTableCellVariation: 'header',
      defaultTextVariation: 'variation12Grey500MediumUppercase'
    },
    data: {
      defaultTableCellVariation: 'data'
    }
  }
});

export default Table;

declare global {
  interface TableVariations {
    spaceBlocksPortal: typeof Table['variationKey'];
  }
}

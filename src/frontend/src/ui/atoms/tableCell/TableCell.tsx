import { TableCell as TableCellBase } from '@wemogy/reactbase';

const TableCell = TableCellBase.extendVariations({
  base: {
    padding: 0,
    paddingRightLeft: 3,
    height: 5,
    boxSizing: 'content-box',
    verticalAlign: 'middle',
    borderStyle: 'solid',
    backgroundColor: 'white',
    border: 0,
    borderBottom: { custom: 1 },
    borderColor: 'grey200',
    horizontalAlign: 'start'
  },
  header: {
    base: {
      backgroundColor: 'grey50'
    },
    stretched: {
      width100: true,
      maxWidth: { custom: 240 }
    }
  },
  data: {
    base: {
      paddingTopBottom: 2
    },
    stretched: {
      width100: true,
      maxWidth: 30
    }
  }
});

export default TableCell;

declare global {
  interface TableCellVariations {
    spaceBlocksPortal: typeof TableCell['variationKey'];
  }
}

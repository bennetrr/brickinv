import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataView, DataViewProps } from 'primereact/dataview';
import { useAppStore } from '../../../domain';
import AddSetModal from './organisms/AddSetModal';
import SetListItem from './organisms/SetListItem';
import useSetLoadingEffect from '../../../utils/UseSetLoadingEffect';

const SetListPage: React.FC = observer(() => {
  const { setStore } = useAppStore();

  const [filterText, setFilterText] = useState('');
  const [addSetModalVisible, setAddSetModalVisible] = useState(false);

  const setsLoading = useSetLoadingEffect();

  const listTemplate = useCallback<Exclude<DataViewProps['listTemplate'], undefined>>(
    items => items.map((item, index) => <SetListItem set={item} index={index} key={item.id} />),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setStore.items, setStore.items.length] // Otherwise the DataView does not rerender
  );

  return (
    <div className="p-2">
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <i className="pi pi-filter"></i>
        </span>

        <InputText
          placeholder="Filter sets by name or number"
          aria-label="Filter sets by name or number"
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
        />

        <Button
          aria-label="Clear filters"
          icon="pi pi-filter-slash"
          severity="secondary"
          onClick={() => setFilterText('')}
        />

        <Button aria-label="Add new set" icon="pi pi-plus" onClick={() => setAddSetModalVisible(true)} />
        <AddSetModal visible={addSetModalVisible} setVisible={setAddSetModalVisible} />
      </div>

      <DataView
        emptyMessage="No sets found"
        value={setStore.filtered(filterText)}
        listTemplate={listTemplate}
        loading={setsLoading}
      />
    </div>
  );
});

export default SetListPage;

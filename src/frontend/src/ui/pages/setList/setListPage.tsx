import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useClerk } from '@clerk/clerk-react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataView, DataViewProps } from 'primereact/dataview';
import { useAsyncEffect, useToast } from '../../../utils';
import { UnauthorizedError, useAppStore } from '../../../domain';
import AddSetModal from './organisms/AddSetModal';
import SetListItem from './organisms/SetListItem';

const SetListPage: React.FC = observer(() => {
  const clerk = useClerk();
  const { setStore } = useAppStore();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [addSetModalVisible, setAddSetModalVisible] = useState(false);

  useAsyncEffect(async () => {
    setLoading(true);

    try {
      await setStore.querySets();
    } catch (exc) {
      if (exc instanceof UnauthorizedError) {
        toast.show({
          severity: 'error',
          summary: 'Failed to load sets',
          detail: 'There is a problem with your session. Try reloading the page or signing out and back in. If that does not help, wait a few minutes and try again.'
        });
      } else {
        toast.show({
          severity: 'error',
          summary: 'Failed to load sets',
          detail: 'There was an unexpected error. Try reloading the page or wait a few minutes.'
        });
      }

      return;
    } finally {
      setLoading(false);
    }
  }, [clerk.session?.id]);

  const listTemplate: DataViewProps['listTemplate'] = (items) => {
    return items.map((item, index) => <SetListItem set={item} index={index} key={item.id} />);
  }

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
          onChange={(e) => setFilterText(e.target.value)}
        />

        <Button
          aria-label="Clear filters"
          icon="pi pi-filter-slash"
          severity="secondary"
          onClick={() => setFilterText('')}
        />

        <Button
          aria-label="Add new set"
          icon="pi pi-plus"
          onClick={() => setAddSetModalVisible(true)}
        />
        <AddSetModal visible={addSetModalVisible} setVisible={setAddSetModalVisible}/>
      </div>

      <DataView loading={loading} value={setStore.filtered(filterText)} listTemplate={listTemplate}/>
    </div>
  );
});

export default SetListPage;

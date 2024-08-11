import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { DataView, DataViewProps } from 'primereact/dataview';
import { useAppStore } from '../../../domain';
import PartListItem from './organisms/PartListItem.tsx';
import useSetLoadingEffect from '../../../utils/UseSetLoadingEffect';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useParams } from 'react-router-dom';
import usePartLoadingEffect from '../../../utils/UsePartLoadingEffect.ts';

const PartListPage: React.FC = observer(() => {
  const { setId } = useParams();
  const { setStore } = useAppStore();

  const set = setStore.getSet(setId);

  const setsLoading = useSetLoadingEffect();
  const partsLoading = usePartLoadingEffect(set);

  const listTemplate = useCallback<Exclude<DataViewProps['listTemplate'], undefined>>(
    items => items.map((item, index) => <PartListItem set={set!} part={item} index={index} key={item.id} />),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setStore.items, setStore.items.length] // Otherwise the DataView does not rerender
  );

  if (setsLoading || partsLoading) {
    return (
      <div className="h-full grid place-items-center">
        <ProgressSpinner />
      </div>
    );
  }

  if (!set) {
    throw 404;
  }

  return (
    <div className="p-2">
      <div className="flex flex-col lg:flex-row lg:gap-3">
        <span className="text-2xl font-bold text-[var(--gray-800)]">{set.setName}</span>
        <span className="text-2xl text-[var(--gray-400)]">{set.setId}</span>
      </div>

      <DataView
        emptyMessage="No parts found"
        value={set.partsSorted}
        listTemplate={listTemplate}
        loading={setsLoading}
      />
    </div>
  );
});

export default PartListPage;

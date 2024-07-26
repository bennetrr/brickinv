import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { UnauthorizedError, useAppStore } from '../../../domain';
import { ProgressSpinner } from 'primereact/progressspinner';
import useSetLoadingEffect from '../../../utils/UseSetLoadingEffect';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { useToast } from '../../../utils';

const SetOverviewPage: React.FC = observer(() => {
  const { setId } = useParams();
  const { setStore } = useAppStore();
  const toast = useToast();
  const [saving, setSaving] = useState(false);

  const set = setStore.getSet(setId);

  const handleSaveClick = useCallback(async () => {
    if (!set) {
      return;
    }

    setSaving(true);

    try {
      await setStore.updateSet(set);
    } catch (exc) {
      if (exc instanceof UnauthorizedError) {
        toast.show({
          severity: 'error',
          summary: 'Failed to save set',
          detail: 'There is a problem with your session. Try reloading the page or signing out and back in. If that does not help, wait a few minutes and try again.'
        });
      } else {
        toast.show({
          severity: 'error',
          summary: 'Failed to save set',
          detail: 'There was an unexpected error. Try reloading the page or wait a few minutes.'
        });
      }

      return;
    } finally {
      setSaving(false);
    }
  }, [set, setStore, toast]);

  const setsLoading = useSetLoadingEffect();

  if (setsLoading) {
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
    <div className="flex flex-col sm:flex-row gap-8 p-2 text-[var(--surface-600)]">
      <img src={set.imageUri} alt="" className="self-center w-[32rem] h-auto rounded-2xl shadow-lg" />

      <div className="flex flex-col gap-4 flex-auto">
        <div className="flex flex-col">
          <label htmlFor="setNumber">Set Number</label>
          <InputText id="setNumber" disabled value={set.setId} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="setName">Set Name</label>
          <InputText id="setName" disabled value={set.setName} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="releaseYear">Released in</label>
          <InputText id="releaseYear" disabled value={set.releaseYear.toString()} />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="forSale"
            checked={set.forSale}
            onChange={e => set?.setForSale(e.checked || false)}
          />
          <label htmlFor="forSale">For Sale</label>
        </div>

        <div className="flex items-center gap-2">
          <InputText aria-label="Finished parts" disabled value={set.presentParts.toString()} className="w-14" />
          <span>Parts of</span>
          <InputText aria-label="Total parts" disabled value={set.totalParts.toString()} className="w-14" />
          <span>present</span>
        </div>

        <div className="flex flex-col">
          <label htmlFor="created">Created on</label>
          <InputText id="created" disabled value={set.createdLocaleString} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="updated">Updated last on</label>
          <InputText id="updated" disabled value={set.updatedLocaleString} />
        </div>
      </div>

      <Button
        icon="pi pi-save"
        aria-label="Save changes"
        rounded
        visible={set.hasChanges}
        className="fixed right-2 bottom-2"
        onClick={handleSaveClick}
        loading={saving}
      />
    </div>
  );
});

export default SetOverviewPage;

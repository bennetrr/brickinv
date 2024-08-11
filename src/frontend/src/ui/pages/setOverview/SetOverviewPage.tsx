import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate, useParams } from 'react-router-dom';
import { UnauthorizedError, useAppStore } from '../../../domain';
import { ProgressSpinner } from 'primereact/progressspinner';
import useSetLoadingEffect from '../../../utils/UseSetLoadingEffect';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { useToast } from '../../../utils';
import { confirmDialog } from 'primereact/confirmdialog';
import { ToastMessage } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';

const SetOverviewPage: React.FC = observer(() => {
  const { setId } = useParams();
  const { setStore } = useAppStore();
  const toast = useToast();
  const navigate = useNavigate();
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
          detail:
            'There is a problem with your session. Try reloading the page or signing out and back in. If that does not help, wait a few minutes and try again.'
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

  const handleDeleteConfirm = useCallback(async () => {
    if (!set) {
      return;
    }

    const toastMessage: ToastMessage = {
      sticky: true,
      closable: false,
      // @ts-expect-error contrast is not included in the type
      severity: 'contrast',
      summary: 'Deleting set...',
      detail: <ProgressBar mode="indeterminate" style={{ height: '6px' }} />
    };

    toast.show(toastMessage);

    try {
      await setStore.deleteSet(set);
    } catch (exc) {
      if (exc instanceof UnauthorizedError) {
        toast.show({
          severity: 'error',
          summary: 'Failed to delete set',
          detail:
            'There is a problem with your session. Try reloading the page or signing out and back in. If that does not help, wait a few minutes and try again.'
        });
      } else {
        toast.show({
          severity: 'error',
          summary: 'Failed to delete set',
          detail: 'There was an unexpected error. Try reloading the page or wait a few minutes.'
        });
      }

      return;
    } finally {
      toast.remove(toastMessage);
    }

    navigate('/sets');
    toast.show({
      severity: 'success',
      summary: 'Successfully deleted the set'
    });
  }, [navigate, set, setStore, toast]);

  const handleDeleteClick = useCallback(() => {
    confirmDialog({
      header: 'Confirm Deletion',
      message: 'Do you really want to delete this set?',
      icon: 'pi pi-exclamation-triangle',
      draggable: false,
      resizable: false,
      accept: handleDeleteConfirm,
      acceptIcon: 'pi pi-trash',
      acceptClassName: 'p-button-danger',
      rejectIcon: 'pi pi-times',
      rejectClassName: 'p-button-link p-button-secondary'
    });
  }, [handleDeleteConfirm]);

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
          <Checkbox id="forSale" checked={set.forSale} onChange={e => set?.setForSale(e.checked || false)} />
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

        <div className="flex justify-end">
          <Button label="Save" icon="pi pi-save" visible={set.hasChanges} onClick={handleSaveClick} loading={saving} />

          <div className="flex-auto" />

          <Button label="Delete this set" icon="pi pi-trash" severity="danger" onClick={handleDeleteClick} />
        </div>
      </div>
    </div>
  );
});

export default SetOverviewPage;

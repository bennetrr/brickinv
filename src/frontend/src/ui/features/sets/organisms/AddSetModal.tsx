import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';
import { RebrickableSetNotFoundError, UnauthorizedError, useAppStore } from '../../../../domain';
import { useToast } from '../../../../utils';
import { ProgressBar } from 'primereact/progressbar';
import { ToastMessage } from 'primereact/toast';

interface IFooterContentProps {
  onSubmit: () => void;
  onAbort: () => void;
}

// eslint-disable-next-line mobx/missing-observer
const FooterContent: React.FC<IFooterContentProps> = ({ onSubmit, onAbort }) => {
  return (
    <>
      <Button label="Cancel" icon="pi pi-times" severity="secondary" onClick={onAbort}/>
      <Button label="Add Set" icon="pi pi-check" onClick={onSubmit}/>
    </>
  )
}

interface IAddSetModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const AddSetModal: React.FC<IAddSetModalProps> = observer(({ visible, setVisible }) => {
  const { setStore } = useAppStore();
  const toast = useToast();
  const [setId, setSetId] = useState('');
  const [forSale, setForSale] = useState(false);

  const handleSubmit = useCallback(async () => {
    setVisible(false);

    const toastMessage: ToastMessage = {
      sticky: true,
      closable: false,
      // @ts-expect-error contrast is not included in the type
      severity: 'contrast',
      summary: 'Creating set...',
      detail: <ProgressBar mode="indeterminate" style={{ height: '6px' }} />
    }

    toast.show(toastMessage);

    try {
      await setStore.createSet(setId, forSale);
    } catch (exc) {
      if (exc instanceof UnauthorizedError) {
        toast.show({
          severity: 'error',
          summary: 'Failed to create set',
          detail: 'There is a problem with your session. Try reloading the page or signing out and back in. If that does not help, wait a few minutes and try again.'
        });
      } else if (exc instanceof RebrickableSetNotFoundError) {
        toast.show({
          severity: 'error',
          summary: 'Failed to create set',
          detail: 'The set number you entered was not found in the database.'
        });
      } else {
        toast.show({
          severity: 'error',
          summary: 'Failed to create set',
          detail: 'There was an unexpected error. Try reloading the page or wait a few minutes.'
        });
      }

      return;
    } finally {
      toast.remove(toastMessage);
    }

    toast.show({
      severity: 'success',
      summary: 'Successfully created the set'
    });
  }, [forSale, setId, setStore, setVisible, toast]);

  const handleAbort = useCallback(() => {
    setVisible(false);

    setSetId('');
    setForSale(false);
  }, [setVisible]);

  return (
    <Dialog
      header="Add new set"
      footer={<FooterContent onSubmit={handleSubmit} onAbort={handleAbort} />}
      visible={visible}
      onHide={handleAbort}
      className="w-[calc(100vw-1rem)] md:w-[50vw]"
      draggable={false}
      resizable={false}
    >
      <div className="flex flex-col gap-4">
        <InputText
          placeholder="Set number"
          aria-label="Set number"
          value={setId}
          onChange={(e) => setSetId(e.target.value)}
        />

        <div className="flex items-center gap-2">
          <InputSwitch
            checked={forSale}
            onChange={(e) => setForSale(e.value)}
            inputId="forSaleInput"
          />
          <label htmlFor="forSaleInput">For sale</label>
        </div>
      </div>
    </Dialog>
  );
});

export default AddSetModal;

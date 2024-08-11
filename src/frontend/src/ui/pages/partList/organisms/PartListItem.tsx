import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { classNames } from 'primereact/utils';
import { IPart, ISet, UnauthorizedError, useAppStore } from '../../../../domain';
import { Button } from 'primereact/button';
import { useToast } from '../../../../utils';

interface ISetListItemProps {
  index: number;
  set: ISet;
  part: IPart;
}

const PartListItem: React.FC<ISetListItemProps> = observer(({ set, part, index }) => {
  const { setStore } = useAppStore();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const updatePartCount = useCallback(
    async (newPartCount: number) => {
      const oldPartCount = part.presentCount;
      part.setPresentCount(newPartCount);
      setLoading(true);

      try {
        await setStore.updatePart(set, part);
      } catch (exc) {
        if (exc instanceof UnauthorizedError) {
          toast.show({
            severity: 'error',
            summary: 'Failed to update part',
            detail:
              'There is a problem with your session. Try reloading the page or signing out and back in. If that does not help, wait a few minutes and try again.'
          });
        } else {
          toast.show({
            severity: 'error',
            summary: 'Failed to load parts',
            detail: 'There was an unexpected error. Try reloading the page or wait a few minutes.'
          });
        }

        part.setPresentCount(oldPartCount);
        return;
      } finally {
        setLoading(false);
      }
    },
    [part, set, setStore, toast]
  );

  return (
    <div
      key={part.id}
      className={classNames('flex flex-col md:grid md:grid-cols-[max-content_1fr] p-4 gap-4', {
        'border-t-2 border-[var(--surface-border)]': index !== 0
      })}
    >
      <img
        src={part.imageUri}
        alt=""
        className={classNames('self-center w-[16rem] h-auto rounded-2xl shadow-lg', {
          'border-4 border-[#16a34a]': part.isComplete
        })}
      />

      <div className="flex flex-col gap-2 items-start">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-[var(--gray-800)]">{part.partName}</span>
          <span className="text-2xl text-[var(--gray-400)]">{part.partId}</span>

          {part.partColor ? (
            <div className="flex items-center gap-2">
              <i className="pi pi-palette" />
              <span>{part.partColor}</span>
            </div>
          ) : null}
        </div>

        <div className="flex gap-4 mt-auto">
          <div className="p-inputgroup">
            <Button
              aria-label="Remove a present part"
              icon="pi pi-minus"
              severity="secondary"
              onClick={() => updatePartCount(part.presentCount - 1)}
              disabled={part.presentCount <= 0}
              loading={loading}
            />

            <span className="p-inputgroup-addon">
              <span>{part.presentCount}</span>
            </span>

            <Button
              aria-label="Add a present part"
              icon="pi pi-plus"
              severity="secondary"
              onClick={() => updatePartCount(part.presentCount + 1)}
              disabled={part.presentCount >= part.totalCount}
              loading={loading}
            />

            <span className="p-inputgroup-addon">
              <span>of {part.totalCount}</span>
            </span>

            <Button
              aria-label="Remove a present part"
              icon="pi pi-check"
              severity="success"
              onClick={() => updatePartCount(part.totalCount)}
              disabled={part.presentCount >= part.totalCount}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default PartListItem;

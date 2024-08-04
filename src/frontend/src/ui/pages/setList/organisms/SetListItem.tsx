import React from 'react';
import { observer } from 'mobx-react';
import { classNames } from 'primereact/utils';
import { Tag } from 'primereact/tag';
import { ISet } from '../../../../domain';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

interface ISetListItemProps {
  index: number;
  set: ISet;
}

const SetListItem: React.FC<ISetListItemProps> = observer(({ set, index }) => {
  return (
    <div key={set.id} className={classNames('flex flex-col md:grid md:grid-cols-[max-content_1fr] p-4 gap-4', { 'border-t-2 border-[var(--surface-border)]': index !== 0 })}>
      <img src={set.imageUri} alt="" className="self-center w-[16rem] h-auto rounded-2xl shadow-lg" />

      <div className="flex flex-col gap-2 items-start">
        <div className="flex flex-col lg:flex-row lg:gap-3">
          <span className="text-2xl font-bold text-[var(--gray-800)]">{set.setName}</span>
          <span className="text-2xl text-[var(--gray-400)]">{set.setId}</span>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <div>
            <Tag
              value={`${set.presentParts} of ${set.totalParts} parts present`}
              severity={set.finished ? 'success' : set.presentParts ? 'info' : 'warning'}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {set.forSale ? (
                <>
                  <i className="pi pi-tag" />
                  <span>For sale</span>
                </>
              ) : (
                <>
                  <i className="pi pi-home" />
                  <span>For keeping</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <i className="pi pi-megaphone" />
              <span>Released in {set.releaseYear}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-auto">
          <Link to={`/sets/${set.id}/overview`}>
            <Button icon="pi pi-sliders-h" label="Set Overview" size="small"/>
          </Link>

          <Link to={`/sets/${set.id}/parts`}>
            <Button severity="secondary" icon="pi pi-list-check" label="Part List" size="small" />
          </Link>
        </div>
      </div>
    </div>
  );
});

export default SetListItem;

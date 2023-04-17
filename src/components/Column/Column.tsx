import React from 'react';
import { Issue } from '../../types/Issue';
import { IssueCard } from '../IssueCard';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from '../SortableItem';
import './column.scss';

type Props = {
  header: string;
  id: string;
  items: Issue[];
};

export const Column: React.FC<Props> = ({ header, id, items }) => {
  const { setNodeRef } = useSortable({
    id,
    data: {
      type: "container",
      children: items,
      name: id,
    },
  });

  return (
    <div className="column" >
      <h2 className="column__title">
        {header}
      </h2>

      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <ul
          className="column__list"
          ref={setNodeRef}
        >
          {items.map((item, index) => (
            <SortableItem key={item.id} id={item.id} index={index} parent={id}>
              <IssueCard issue={item} />
            </SortableItem>
          ))}
        </ul>
      </SortableContext>
    </div>
  );
};

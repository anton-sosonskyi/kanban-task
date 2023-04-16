import React from 'react';
import { Issue } from '../../types/Issue';
import { useDroppable } from '@dnd-kit/core';
import { IssueCard } from '../IssueCard';
import './column.scss';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from '../SortableItem';

type Props = {
  header: string;
  colName: string;
  items: Issue[];
};

export const Column: React.FC<Props> = ({ header, colName, items }) => {
  const { setNodeRef } = useDroppable({
    id: colName,
  });

  return (
    <div className="column">
      <h2 className="column__title">
        {header}
      </h2>

      <SortableContext
        id={colName}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <ul
          className="column__list"
          ref={setNodeRef}
        >
          {items.map((item, index) => (
            <SortableItem key={item.id} id={item.id} index={index} parent={colName}>
              <IssueCard issue={item} />
            </SortableItem>
          ))}
        </ul>
      </SortableContext>
    </div>
  );
};

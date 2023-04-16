import React from 'react';
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

import { useDroppable } from '@dnd-kit/core';
import { Issue } from '../../types/Issue';

type Props = {
  id: string;
  items: Issue[];
};

export const Droppable: React.FC<Props> = ({ id, items }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef}>

      </div>
    </SortableContext>
  );
};

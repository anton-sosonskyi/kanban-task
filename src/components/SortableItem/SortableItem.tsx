import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";

type Props = {
  id: number;
  parent: string;
  index: number;
  children: React.ReactNode;
}

export const SortableItem: React.FC<Props> = ({ id, parent, index, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: String(id),
    data: {
      index,
      parent,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </li>
  );
};

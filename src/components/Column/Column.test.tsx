import { test, expect } from 'vitest';
import { Column } from '../Column';
import { render, screen } from '@testing-library/react';

test('renders the column header', () => {
  const props = {
    header: 'ToDo',
    id: 'TODO',
    items: [],
  };
  render(<Column {...props} />);
  expect(screen.getByText('ToDo')).toBeInTheDocument();
});

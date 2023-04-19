import { IssueCard } from './IssueCard';
import { render, screen } from '@testing-library/react';

const issue = {
  id: 1,
  created_at: '2022-01-01T00:00:00Z',
  title: 'Test Issue',
  number: 1,
  user: { type:'User' },
  state: "open",
  assignee:{ login: 'qwer' },
  comments: 2,
};

describe('IssueCard', () => {
  it('renders the issue details correctly', () => {
    render(<IssueCard issue={issue} />);
    const title = screen.getByText(/Test Issue/i);
    const text = screen.getByText(/#1 opened 474 days ago/i);
    const comments = screen.getByText(/Comments 2/i)
    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(comments).toBeInTheDocument();
  });
});

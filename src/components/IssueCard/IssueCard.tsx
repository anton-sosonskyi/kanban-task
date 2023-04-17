import React from 'react';
import { Issue } from '../../types/Issue';
import { Card } from 'antd';
import { getDaysPass } from '../../utils/helpers';
import './card.scss';

type Props = {
  issue: Issue;
};

export const IssueCard: React.FC<Props> = ({
  issue: {
    created_at,
    title,
    number,
    user,
    comments,
  },
 }) => {
  const daysPass = getDaysPass(created_at);

  return (
    <Card className="card">
      <h3 className="card__title">
        {title}
      </h3>

      <span className="card__text">
        {`#${number} opened ${daysPass} days ago`}
      </span>

      <span className="card__text">
        {`${user} | Comments ${comments}`}
      </span>
    </Card>
  );
};

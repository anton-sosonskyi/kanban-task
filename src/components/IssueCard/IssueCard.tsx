import React from 'react';
import { Issue } from '../../types/Issue';
import { Card } from 'antd';
import { getDaysPass } from '../../utils/helpers';
import './card.scss';

type Props = {
  issue: Issue;
};

export const IssueCard: React.FC<Props> = ({ issue }) => {

  const daysPass = getDaysPass(issue.created_at);

  return (
    <Card className="card">
      <h3 className="card__title">
        {issue.title}
      </h3>

      <span className="card__text">
        {`#${issue.number} opened ${daysPass} days ago`}
      </span>

      <span className="card__text">
        {`${issue.user} | Comments ${issue.comments}`}
      </span>
    </Card>
  );
};

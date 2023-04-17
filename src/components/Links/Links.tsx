import { Breadcrumb } from 'antd';
import { useMemo, memo } from 'react'
import { useAppSelector } from '../../hooks/useApp';
import { getRepoName } from '../../utils/helpers';
import './links.scss';

export const Links: React.FC = memo(() => {
  const { repoURL, starsCount, isError } = useAppSelector(state => state.repo);

  const repoNames = useMemo(() => getRepoName(repoURL)
    .split('/')
    .map(name => name[0].toUpperCase() + name.slice(1)), [repoURL]);

  const ownerURL = useMemo(() => {
    const repo = getRepoName(repoURL).split('/')[1];
    const index = repoURL.indexOf(`/${repo}`);
    return repoURL.slice(0, index);
  }, [repoURL]);

  const normalizedStarCount = useMemo(() => {
    if (starsCount < 1000) {
      return String(starsCount);
    }

    const formatedNum = starsCount.toLocaleString('en-US', {maximumFractionDigits:1}).slice(0, -2);

    return formatedNum + " K";
  }, [repoURL]);

  return (
    <div className="links">
      {(repoURL && !isError) && (
        <>
          <Breadcrumb
            style={{
              padding: 10,
            }}
            separator=">"
            items={[
              {
                title: <a
                  target='_blank'
                  rel="noreferrer"
                  href={`${ownerURL}`}>
                  {`${repoNames[0]}`}
                </a>,
              },
              {
                title: <a
                  target='_blank'
                  rel="noreferrer"
                  href={`${repoURL}`}>
                  {`${repoNames[1]}`}
                </a>,
              },
            ]}
          />

          <div className="links__stars">
            <div className="links__stars-icon"></div>
            <span className="links__stars-count">{`${normalizedStarCount} stars`}</span>
          </div>
        </>
      )}
    </div>
  );
});

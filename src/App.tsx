import { DndContext } from '@dnd-kit/core';
import { Breadcrumb, Row, Col, Layout, List } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { CustomInput } from './components/CustomInput';
import { useCallback, useEffect, useState } from 'react';
import { getRepoName, prepareBoard } from './utils/helpers';
import * as repoActions from './features/repo/repoSlice';
import * as boardActions from './features/board/boardSlice';
import { useAppDispatch, useAppSelector } from './hooks/useApp';
import { IssueCard } from './components/IssueCard';

function App() {
  const [currentRepoURL, setCurrentRepoURL] = useState('');
  const { issues } = useAppSelector(state => state.repo);
  const { columns } = useAppSelector(state => state.board);
  const dispatch = useAppDispatch();

  const handleURLChange = useCallback(setCurrentRepoURL, []);

  useEffect(() => {
    if (!currentRepoURL) {
      return;
    }

    dispatch(repoActions.loadIssues(currentRepoURL));
  }, [currentRepoURL]);

  useEffect(() => {
    if (!currentRepoURL) {
      return;
    }

    const repoName = getRepoName(currentRepoURL);
    const boardColumns = prepareBoard(issues);

    dispatch(boardActions.initBoard({ name: repoName, columns: boardColumns }));
    // const savedBoard = getFromSessionStorage(repoName);
    // if (savedBoard) {
    //   dispatch(boardActions.initBoard({name: repoName, }))
    // }

  }, [currentRepoURL, issues]);

  return (
    <Layout>
      <Header
        style={{
          padding: 10,
          backgroundColor: "#fff",
        }}
      >
        <CustomInput handleURLChange={handleURLChange} />
      </Header>

      <Content >
        <Breadcrumb
          style={{
            padding: 10,
          }}
          separator=">"
          items={[
            {
              title: 'Application Center',
              href: '',
            },
            {
              title: 'Application List',
              href: '',
            },
          ]}
        />

        <DndContext onDragEnd={(e) => console.log(e)}>
          <Row gutter={[16, 16]}>
            <Col span={8}>

              <List
                bordered
                header={"Todo"}
                dataSource={columns.todo}
                renderItem={(item) => (
                  <List.Item>
                    <IssueCard issue={item} />
                  </List.Item>
                )}
              />
            </Col>

            <Col span={8}>
              <List
                bordered
                header={"In Progress"}
                dataSource={columns.inProgress}
                renderItem={(item) => (
                  <List.Item>
                    <IssueCard issue={item} />
                  </List.Item>
                )}
              />
            </Col>

            <Col span={8}>
              <List
                bordered
                header={"Done"}
                dataSource={columns.done}
                renderItem={(item) => (
                  <List.Item>
                    <IssueCard issue={item} />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </DndContext>
      </Content>
    </Layout>
  );
};

export default App;

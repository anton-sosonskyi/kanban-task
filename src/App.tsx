import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCenter, closestCorners } from '@dnd-kit/core';
import { Breadcrumb, Row, Col, Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { CustomInput } from './components/CustomInput';
import { useCallback, useEffect, useState } from 'react';
import { getRepoName, prepareBoard } from './utils/helpers';
import * as repoActions from './features/repo/repoSlice';
import * as boardActions from './features/board/boardSlice';
import { useAppDispatch, useAppSelector } from './hooks/useApp';
import { Column } from './components/Column';
import { IssueCard } from './components/IssueCard';
import { Issue } from './types/Issue';

function App() {
  const [currentRepoURL, setCurrentRepoURL] = useState('');
  const [activeId, setActiveId] = useState('');
  const { issues } = useAppSelector(state => state.repo);
  const { columns } = useAppSelector(state => state.board);
  const dispatch = useAppDispatch();

  const handleURLChange = useCallback(setCurrentRepoURL, []);

  const getActiveId = (id: string, cards: Issue[]) => {
    const activeIssue = cards.find(card => card.id === +id);
    return activeIssue;
  }

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

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeElement = active.data.current;
    const overElement = over?.data.current;
    console.log(activeElement, overElement)
    // console.log(active, over)

    if (!over) {
      return;
    }

    dispatch(boardActions.reoder(
      {
        source: activeElement?.parent,
        destination: overElement?.parent,
        sourceIndex: activeElement?.index,
        destinationIndex: overElement?.index,
      }
    ));
    setActiveId('');
  };

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

        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Row gutter={[16, 16]} justify="center">
            <Col span={6}>
              <Column items={columns.todo} header="ToDo" colName="todo" />
            </Col>

            <Col span={6}>
              <Column items={columns.inProgress} header="In Progress" colName="inProgress" />
            </Col>

            <Col span={6}>
              <Column items={columns.done} header="Done" colName="done" />
            </Col>
          </Row>

          <DragOverlay
            dropAnimation={{
              duration: 500,
              easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
            }}
          >
            {activeId ? <IssueCard issue={getActiveId(activeId, issues) as Issue} /> : null}
          </DragOverlay>
        </DndContext>
      </Content>
    </Layout>
  );
};

export default App;

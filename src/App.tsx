import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  getActiveId,
  getFromSessionStorage,
  getRepoName,
  prepareBoard,
} from './utils/helpers';
import { Layout, Result, Spin } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { CustomInput } from './components/CustomInput';
import { useCallback, useEffect, useState } from 'react';
import * as repoActions from './features/repo/repoSlice';
import * as boardActions from './features/board/boardSlice';
import { useAppDispatch, useAppSelector } from './hooks/useApp';
import { IssueCard } from './components/IssueCard';
import { Issue } from './types/Issue';
import { Board } from './components/Board';
import { Links } from './components/Links';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

function App() {
  const [currentRepoURL, setCurrentRepoURL] = useState('');
  const [activeId, setActiveId] = useState('');
  const { issues, loaded, isLoading, isError } = useAppSelector(state => state.repo);
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
    const savedBoard = getFromSessionStorage(repoName);

    if (savedBoard) {
      dispatch(boardActions.initBoard({ name: repoName, columns: savedBoard }));
      return;
    }

    const boardColumns = prepareBoard(issues);
    dispatch(boardActions.initBoard({ name: repoName, columns: boardColumns }));

  }, [currentRepoURL, issues]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeElement = active.data.current;
    const overElement = over?.data.current;

    if (!over || !active) {
      return;
    }
    const isSameParent = overElement?.parent === activeElement?.parent;
    const isSameIndex = activeElement?.index === overElement?.index;

    if (isSameParent && isSameIndex) {
      setActiveId('');
      return;
    }

    if (overElement?.type === "container") {
      dispatch(boardActions.add(
        {
          source: activeElement?.parent,
          destination: overElement?.name,
          sourceIndex: activeElement?.index,
        }
      ));

    } else {
      dispatch(boardActions.reoder(
        {
          source: activeElement?.parent,
          destination: overElement?.parent,
          sourceIndex: activeElement?.index,
          destinationIndex: overElement?.index,
        }
      ));
    }

    setActiveId('');
    dispatch(boardActions.save());
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

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

      <Content
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          
        }}
      >
        {isLoading && (
          <div className="container--loading">
            <Spin />
          </div>
        )}

        {loaded && isError && (
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the repository you visited does not exist."
          />
        )}

        {loaded && !isError && (
          <>
            <Links />

            <DndContext
              collisionDetection={closestCorners}
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <Board />

              <DragOverlay
                style={{
                  cursor: "grabb",
                }}
                dropAnimation={{
                  duration: 500,
                  easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
                }}
              >
                {activeId
                  ? <IssueCard issue={getActiveId(activeId, issues) as Issue} />
                  : null
                }
              </DragOverlay>
            </DndContext>
          </>
        )};
      </Content>
    </Layout>
  );
}

export default App;

import Task from '@/components/Task';
import { useTaskStore } from '@/utils/store';
import { BaseProvider, LightTheme, styled } from 'baseui';
import { Card, StyledBody } from 'baseui/card';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { useEffect, useRef, useState } from "react";
import Details from "@/components/Details";

const engine = new Styletron();
const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  paddingTop: '20px',
});
export default function App() {
  const tasks = useTaskStore(state => state.tasks)
  const isEditingNew = useTaskStore(state => state.isEditingNew)
  const setIsEditingNew = useTaskStore(state => state.setIsEditingNew)
  const changeFocus = useTaskStore(state => state.changeFocus)
  const cardBodyRef = useRef<HTMLDivElement>(null)
  const [isCheckingMore, setCheckingMore] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task>()

  const handleClickMargin = () => {
    setIsEditingNew(true)
    changeFocus(undefined)
  }

  const handleMoreOpen = (t: Task) => {
    setCheckingMore(true)
    setCurrentTask(t)
  }

  const handleMoreClose = () => {
    setCheckingMore(false)
  }

  // hook that keeps scrollbar at bottom when adding new
  useEffect(() => {
    const cardBodyCurrent = cardBodyRef?.current

    if (isEditingNew && cardBodyCurrent) {
      cardBodyCurrent.scrollTop = cardBodyCurrent.scrollHeight
    }
  }, [isEditingNew])

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Centered>
          <Card
            overrides={{
              Root: {
                style: {
                  width: '380px',
                  height: '680px',
                },
              },
              Title: {
                style: {
                  userSelect: 'none',
                },
              },
            }}
            title="Now"
          >
            <StyledBody
              ref={cardBodyRef}
              style={{overflowY: 'auto', height: '610px', display: 'flex', flexDirection: 'column',}}
            >
              {/*key prop using to force tasks to re-render when edited in Details component*/}
              <div key={String(new Date())}>
                {tasks.map(t =>
                  <Task
                    data={t}
                    key={t.id}
                    onClickMore={() => handleMoreOpen(t)}
                  />
                )}
              </div>
              <div
                style={{flexGrow: 1, paddingBottom: '120px',}}
                onClick={handleClickMargin}
              >
                {isEditingNew && <Task data={undefined}/>}
              </div>
            </StyledBody>
          </Card>
        </Centered>
        {currentTask &&
          <Details
            initialData={currentTask}
            open={isCheckingMore}
            onClose={handleMoreClose}
          />
        }
      </BaseProvider>
    </StyletronProvider>
  );
}

import Task from '@/components/Task';
import { useTaskStore } from '@/utils/store';
import { BaseProvider, LightTheme, styled } from 'baseui';
import { Card, StyledBody } from 'baseui/card';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { useEffect, useRef, useState } from "react";
import Details from "@/components/Details";
import CardSelector from "@/components/CardSelector";
import { addDays, isAfter, isBefore } from 'date-fns';

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
  const currentTaskType = useTaskStore(state => state.currentTaskType)
  const cardBodyRef = useRef<HTMLDivElement>(null)
  const [isCheckingMore, setCheckingMore] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task>()
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])

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

  const getTypeTasks = (v: TaskTypeId) => {
    if (v === '0') {
      return tasks.filter((t) => {
        return t.isCompleted
      })
    }

    if (v === '1') {
      return tasks.filter((t) => {
        if (t.isCompleted) {
          return false
        }

        const twoDaysFromNow = addDays(new Date(), 2)

        return isBefore(new Date(t.deadline), twoDaysFromNow)
      })
    }

    if (v === '2') {
      return tasks.filter((t) => {
        if (t.isCompleted) {
          return false
        }

        const twoDaysFromNow = addDays(new Date(), 2)

        return isAfter(new Date(t.deadline), twoDaysFromNow)
      })
    }

    return []
  }

  // hook that keeps scrollbar at bottom when adding new
  useEffect(() => {
    const cardBodyCurrent = cardBodyRef?.current

    if (isEditingNew && cardBodyCurrent) {
      cardBodyCurrent.scrollTop = cardBodyCurrent.scrollHeight
    }
  }, [isEditingNew])

  useEffect(() => {
    setFilteredTasks(getTypeTasks(currentTaskType))
  }, [currentTaskType])

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
            title={
              <CardSelector />
            }
          >
            <StyledBody
              ref={cardBodyRef}
              style={{ overflowY: 'auto', height: '586px', display: 'flex', flexDirection: 'column' }}
            >
              {/*key prop using to force tasks to re-render when edited in Details component*/}
              <div key={String(new Date())}>
                {filteredTasks.map(t =>
                  <Task
                    data={t}
                    key={t.id}
                    onClickMore={() => handleMoreOpen(t)}
                  />,
                )}
              </div>
              <div
                style={{ flexGrow: 1, paddingBottom: '120px' }}
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

import Task from '@/components/Task';
import { useTaskStore } from '@/utils/store';
import { BaseProvider, LightTheme, styled } from 'baseui';
import { Card, StyledBody } from 'baseui/card';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { useEffect, useRef, useState } from "react";
import Details from "@/components/Details";
import { addDays, isAfter, isBefore } from 'date-fns';
import { FILL, Tab, Tabs } from "baseui/tabs-motion";

type FilteredTasksType = {
  [key: string]: Task[]
}

const engine = new Styletron();
const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  paddingTop: '20px',
});

const TabPanelOverrides = {
  TabPanel: {
    style: {
      paddingRight: 0,
      paddingLeft: 0,
    },
  },
}

export default function App() {
  const tasks = useTaskStore(state => state.tasks)
  const isEditingNew = useTaskStore(state => state.isEditingNew)
  const setIsEditingNew = useTaskStore(state => state.setIsEditingNew)
  const changeFocus = useTaskStore(state => state.changeFocus)
  const currentTaskType = useTaskStore(state => state.currentTaskType)
  const setCurrentTaskType = useTaskStore(state => state.setCurrentTaskType)
  const cardBodyRef = useRef<HTMLDivElement>(null)
  const [isCheckingMore, setCheckingMore] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task>()
  const [filteredTasks, setFilteredTasks] = useState<FilteredTasksType>({
    '0': [],
    '1': [],
    '2': [],
  })

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

  const TabContent = () => (
    <StyledBody
      ref={cardBodyRef}
      style={{ overflowY: 'auto', height: '586px', display: 'flex', flexDirection: 'column' }}
    >
      <div>
        {filteredTasks[currentTaskType].map(t =>
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
  )

  // hook that keeps scrollbar at bottom when adding new
  useEffect(() => {
    const cardBodyCurrent = cardBodyRef?.current

    if (isEditingNew && cardBodyCurrent) {
      cardBodyCurrent.scrollTop = cardBodyCurrent.scrollHeight
    }
  }, [isEditingNew])

  useEffect(() => {
    setFilteredTasks({
      '0': getTypeTasks('0'),
      '1': getTypeTasks('1'),
      '2': getTypeTasks('2'),
    })
  }, [currentTaskType, tasks])

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
          >
            <Tabs
              activeKey={currentTaskType}
              fill={FILL.fixed}
              onChange={({ activeKey }) => setCurrentTaskType(activeKey)}
            >
              <Tab
                overrides={TabPanelOverrides}
                title="Before"
              >
                <TabContent />
              </Tab>
              <Tab
                overrides={TabPanelOverrides}
                title="Now"
              >
                <TabContent />
              </Tab>
              <Tab
                overrides={TabPanelOverrides}
                title="After"
              >
                <TabContent />
              </Tab>
            </Tabs>
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

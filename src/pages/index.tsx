import TaskInput from '@/components/TaskInput';
import { BaseProvider, LightTheme, styled } from 'baseui';
import { Card } from 'baseui/card';
import { Checkbox } from 'baseui/checkbox';
import { ListItem } from 'baseui/list';
import {ChangeEvent, useState} from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import {TASKS} from "@/data";

const engine = new Styletron();
const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  paddingTop: '50px',
});
export default function Hello() {
  const [tasks, setTasks] = useState<Task[]>(TASKS)

  const handleCheckChange = (e: ChangeEvent<HTMLInputElement>, targetId: string) => {
    setTasks(oldTasks => {
      const tempTasks = [...oldTasks] // TODO: need better copy method
      tempTasks.forEach(oT=> {
        if (oT.id === targetId) {
          oT.isCompleted = !oT.isCompleted
        }
      })

      return tempTasks
    })
  }

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Centered>
          <Card
            overrides={{Root: {style: {width: '328px', height: '500px',},},}}
            title="Now"
          >
            {tasks.map(t=>
              <ListItem
                artwork={() => (
                  <Checkbox
                    checked={t.isCompleted}
                    onChange={(e) => handleCheckChange(e, t.id)}
                  />
                )}
                key={t.id}
              >
                <TaskInput task={t} />
              </ListItem>
            )}
          </Card>
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  );
}

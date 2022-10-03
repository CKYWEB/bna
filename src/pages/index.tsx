import TaskInput from '@/components/TaskInput';
import { BaseProvider, LightTheme, styled } from 'baseui';
import { Card } from 'baseui/card';
import { Checkbox } from 'baseui/checkbox';
import { ListItem } from 'baseui/list';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import {useTaskStore} from "@/utils/store";

const engine = new Styletron();
const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  paddingTop: '50px',
});
export default function Hello() {
  const tasks = useTaskStore(state => state.tasks)
  const toggleTask = useTaskStore(state => state.toggleTask)

  const handleCheckChange = (targetId: string) => {
    toggleTask(targetId)
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
                    onChange={() => handleCheckChange(t.id)}
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

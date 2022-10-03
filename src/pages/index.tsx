import TaskInput from '@/components/TaskInput';
import { BaseProvider, LightTheme, styled } from 'baseui';
import { Card } from 'baseui/card';
import { Checkbox } from 'baseui/checkbox';
import { ListItem } from 'baseui/list';
import { useState } from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';

const engine = new Styletron();
const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  paddingTop: '50px',
});
export default function Hello() {
  const [checked, setChecked] = useState(false);

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Centered>
          <Card
            overrides={{Root: {style: {width: '328px', height: '500px',},},}}
            title="Now"
          >
            <ListItem
              artwork={() => (
                <Checkbox
                  checked={checked}
                  onChange={e => setChecked(e.target.checked)}
                />
              )}
            >
              <TaskInput
                task={{value: "todo1",}}
              />
            </ListItem>
          </Card>
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  );
}

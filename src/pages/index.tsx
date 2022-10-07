import { BaseProvider, LightTheme, styled } from 'baseui';
import {Card, StyledBody} from 'baseui/card';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import {useTaskStore} from "@/utils/store";
import Task from '@/components/Task';

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

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Centered>
          <Card
            overrides={{Root: {style: {width: '328px', height: '540px',},},}}
            title="Now"
          >
            <StyledBody style={{ overflowY: 'scroll', height: '450px', }}>
              <div>
                {tasks.map(t =>
                  <Task
                    key={t.id}
                    data={t}
                  />
                )}
                <Task data={undefined}/>
              </div>
            </StyledBody>
          </Card>
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  );
}

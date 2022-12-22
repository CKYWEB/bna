import Task from '@/components/Task';
import { useTaskStore } from '@/utils/store';
import { BaseProvider, LightTheme, styled } from 'baseui';
import { Card, StyledBody } from 'baseui/card';
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
  const tasks = useTaskStore(state => state.tasks)
  const isEditingNew = useTaskStore(state => state.isEditingNew)
  const setIsEditingNew = useTaskStore(state => state.setIsEditingNew)

  const handleClickMargin = () => {
    setIsEditingNew(true)
  }

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Centered>
          <Card
            overrides={{Root: {style: {width: '328px', height: '540px',},},}}
            title="Now"
          >
            <StyledBody style={{ overflowY: 'auto', height: '450px', display: 'flex', flexDirection: 'column', }}>
              <div>
                {tasks.map(t =>
                  <Task
                    data={t}
                    key={t.id}
                  />
                )}
              </div>
              {isEditingNew ?
                <Task data={undefined} /> :
                <div
                  style={{flexGrow: 1,}}
                  onClick={handleClickMargin}
                />
              }
            </StyledBody>
          </Card>
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  );
}

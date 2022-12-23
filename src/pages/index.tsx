import Task from '@/components/Task';
import { useTaskStore } from '@/utils/store';
import { BaseProvider, LightTheme, styled } from 'baseui';
import { Card, StyledBody } from 'baseui/card';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { useEffect, useRef } from "react";

const engine = new Styletron();
const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  paddingTop: '50px',
});
export default function App() {
  const tasks = useTaskStore(state => state.tasks)
  const isEditingNew = useTaskStore(state => state.isEditingNew)
  const setIsEditingNew = useTaskStore(state => state.setIsEditingNew)
  const setFocusId = useTaskStore(state => state.setFocusId)
  const cardBodyRef = useRef<HTMLDivElement>(null)

  const handleClickMargin = () => {
    setIsEditingNew(true)
    setFocusId(null)
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
            overrides={{Root: {style: {width: '380px', height: '540px',},},}}
            title="Now"
          >
            <StyledBody
              ref={cardBodyRef}
              style={{ overflowY: 'auto', height: '450px', display: 'flex', flexDirection: 'column', }}
            >
              <div>
                {tasks.map(t =>
                  <Task
                    data={t}
                    key={t.id}
                  />
                )}
              </div>
              <div
                style={{ flexGrow:1, paddingBottom: '120px', }}
                onClick={handleClickMargin}
              >
                {isEditingNew && <Task data={undefined} /> }
              </div>
            </StyledBody>
          </Card>
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  );
}

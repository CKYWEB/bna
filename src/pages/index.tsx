import { BaseProvider, LightTheme, styled } from 'baseui';
import {Card, StyledBody} from 'baseui/card';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import {useTaskStore} from "@/utils/store";
import Task from '@/components/Task';
import { useState } from "react";

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
  const [isEditingNew, setIsEditingNew] = useState(false)

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
            <StyledBody style={{ overflowY: 'auto', height: '450px', display: 'flex', flexDirection: 'column' }}>
              <div>
                {tasks.map(t =>
                  <Task
                    key={t.id}
                    data={t}
                  />
                )}
                {isEditingNew &&
                  <Task
                    data={undefined}
                    isEditing={isEditingNew}
                    setIsEditing={setIsEditingNew}
                  />
                }
              </div>
              {!isEditingNew &&
                <div
                  style={{flexGrow: 1}}
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

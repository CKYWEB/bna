import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider, styled} from 'baseui';
import {ListItem, ListItemLabel} from "baseui/list";
import {Checkbox} from "baseui/checkbox";
import {useState} from "react";
import {Card} from "baseui/card";

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
              <ListItemLabel>Label</ListItemLabel>
          </ListItem>
          </Card>
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  );
}

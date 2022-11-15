import {Checkbox} from "baseui/checkbox";
import TaskName from "@/components/TaskName";
import {ListItem} from "baseui/list";
import {useTaskStore} from "@/utils/store";

type Props = {
  data?: Task;
}

export default function Task (props: Props) {
  const toggleTask = useTaskStore(state => state.toggleTask)

  const handleCheckChange = (targetId: string | undefined) => {
    if (targetId) {
      toggleTask(targetId)
    }
  }

  return (
    <ListItem
      artwork={() => (
        <Checkbox
          checked={props.data?.isCompleted}
          onChange={() => handleCheckChange(props.data?.id)}
          disabled={props.data === undefined}
        />
      )}
      key={props.data?.id}
      overrides={{
        Root: {
          style: () => ({
            alignItems: 'baseline',
          })
        },
        Content: {
          style: () => ({
            minHeight: '0px',
            padding: '16px 0',
          })
        }
      }}
    >
      <TaskName task={props.data} />
    </ListItem>
  )
}

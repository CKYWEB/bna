import {Checkbox} from "baseui/checkbox";
import TaskInput from "@/components/TaskInput";
import {ListItem} from "baseui/list";
import {useTaskStore} from "@/utils/store";

type Props = {
  data?: Task;
}

export default function Task (props: Props) {
  if (props.data === undefined) {
    return (
      <ListItem
        artwork={() => (
          <Checkbox disabled/>
        )}
      >
        <TaskInput />
      </ListItem>
    )
  }
  const {id, isCompleted} = props.data
  const toggleTask = useTaskStore(state => state.toggleTask)

  const handleCheckChange = (targetId: string) => {
    toggleTask(targetId)
  }

  return (
    <ListItem
      artwork={() => (
        <Checkbox
          checked={isCompleted}
          onChange={() => handleCheckChange(id)}
        />
      )}
      key={id}
    >
      <TaskInput task={props.data}/>
    </ListItem>
  )
}

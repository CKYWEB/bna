import {Checkbox} from "baseui/checkbox";
import TaskInput from "@/components/TaskInput";
import {ListItem} from "baseui/list";
import {useTaskStore} from "@/utils/store";

type Props = {
  data?: Task;
  isEditing?: boolean;
  setIsEditing?: (v: boolean) => void;
}

export default function Task (props: Props) {
  if (props.data === undefined) {
    return (
      <ListItem
        artwork={() => (
          <Checkbox disabled/>
        )}
      >
        <TaskInput
          isEditing={props.isEditing}
          setIsEditing={props.setIsEditing}
        />
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
      <TaskInput
        task={props.data}
        isEditing={props.isEditing}
        setIsEditing={props.setIsEditing}
      />
    </ListItem>
  )
}

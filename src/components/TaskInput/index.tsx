import {Input} from "baseui/input";
import {ChangeEvent, useState, FocusEvent} from "react";
import { styled } from "baseui";
import {useTaskStore} from "@/utils/store";

type Props = {
  task?: Task;
  onClick?: () => void;
}

export default function TaskInput (props: Props) {
  const editTask = useTaskStore(state => state.editTask)
  const addTask = useTaskStore(state => state.addTask)
  const [isEditing, setIsEditing] = useState(false)
  const FullWidthLabel = styled('div', ({$theme,}) => ({
    color: $theme.colors[props.task?.isCompleted ? 'mono600' : 'primaryA'],
    width: '100%',
    minHeight: '24px', // to make sure div don't collapse when empty
  }));

  const handleClickLabel = () => {
    setIsEditing(true)
    if (props.onClick) {
      props.onClick()
    }
  }

  const handleBlurInput = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (props.task === undefined && e.target.value !== '') {
      addTask(e.target.value)
    }
    setIsEditing(false)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (props.task) {
      editTask(props.task.id, e.target.value)

      return
    }
  }

  if (isEditing) {
    return (
      <Input
        autoFocus
        value={props.task?.value}
        onBlur={handleBlurInput}
        onChange={handleInputChange}
      />
    )
  }
  return (
    <FullWidthLabel onClick={handleClickLabel}>
      {props.task?.value}
    </FullWidthLabel>
  )
}

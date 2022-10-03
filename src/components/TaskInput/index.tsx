import {Input} from "baseui/input";
import {ChangeEvent, useState} from "react";
import { styled } from "baseui";
import {useTaskStore} from "@/utils/store";

type Props = {
  task: Task;
  onClick?: () => void;
}

export default function TaskInput (props: Props) {
  const editTask = useTaskStore(state => state.editTask)
  const [isEditing, setIsEditing] = useState(false)
  const FullWidthLabel = styled('div', ({$theme,}) => ({
    color: $theme.colors[props.task.isCompleted ? 'mono600' : 'primaryA'],
    width: '100%',
  }));

  const handleClickLabel = () => {
    setIsEditing(true)
    if (props.onClick) {
      props.onClick()
    }
  }

  const handleBlurInput = () => {
    setIsEditing(false)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    editTask(props.task.id, e.target.value)
  }

  if (isEditing) {
    return (
      <Input
        autoFocus
        value={props.task.value}
        onBlur={handleBlurInput}
        onChange={handleInputChange}
      />
    )
  }
  return (
    <FullWidthLabel onClick={handleClickLabel}>
      {props.task.value}
    </FullWidthLabel>
  )
}

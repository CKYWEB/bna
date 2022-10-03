import {Input} from "baseui/input";
import {useState} from "react";
import { styled } from "baseui";

type Props = {
  task: Task;
  onClick?: () => void;
}

export default function TaskInput (props: Props) {
  const [currentEdit, setCurrentEdit] = useState(props.task.value)
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

  if (isEditing) {
    return (
      <Input
        autoFocus
        value={currentEdit}
        onBlur={handleBlurInput}
        onChange={e => setCurrentEdit(e.target.value)}
      />
    )
  }
  return (
    <FullWidthLabel onClick={handleClickLabel}>
      {props.task.value}
    </FullWidthLabel>
  )
}

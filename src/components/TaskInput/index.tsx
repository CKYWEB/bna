import {Input} from "baseui/input";
import {useState} from "react";
import { styled } from "baseui";

type Props = {
  task: Task;
  onClick?: () => void;
}

const FullWidthLabel = styled('div', {
  width: '100%',
});

export default function TaskInput (props: Props) {
  const [currentEdit, setCurrentEdit] = useState(props.task.value)
  const [isEditing, setIsEditing] = useState(false)

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

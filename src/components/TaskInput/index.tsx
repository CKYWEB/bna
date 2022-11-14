import {ChangeEvent, FocusEvent, useRef, useState} from "react";
import {styled} from "baseui";
import {useTaskStore} from "@/utils/store";
import {Textarea} from "baseui/textarea";

type Props = {
  task?: Task;
  onClick?: () => void;
  isEditing?: boolean;
  setIsEditing?: (v: boolean) => void;
}

export default function TaskInput (props: Props) {
  const editTask = useTaskStore(state => state.editTask)
  const addTask = useTaskStore(state => state.addTask)
  const deleteTask = useTaskStore(state => state.deleteTask)
  const [isEditing, setIsEditing] = useState(false)
  const FullWidthLabel = styled('div', ({$theme,}) => ({
    color: $theme.colors[props.task?.isCompleted ? 'mono600' : 'primaryA'],
    width: '100%',
    minHeight: '24px', // to make sure div don't collapse when empty
    wordBreak: 'break-all',
  }));
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [textAreaHeight, setTextAreaHeight] = useState<number | undefined>(24)

  const handleEditDone = (value: string) => {
    if (props.task === undefined && value !== '') {
      addTask(value)
    }
    if (props.task && value === '') {
      deleteTask(props.task.id)
    }
    if (props.setIsEditing) {
      props.setIsEditing(false)
    } else {
      setIsEditing(false)
    }
  }

  const handleClickLabel = () => {
    if (props.setIsEditing) {
      props.setIsEditing(true)
    } else {
      setIsEditing(true)
    }

    if (props.onClick) {
      props.onClick()
    }
  }

  const handleBlurInput = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleEditDone(e.target.value)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextAreaHeight(inputRef.current?.scrollHeight)
    if (props.task) {
      editTask(props.task.id, e.target.value)

      return
    }
  }

  const handleFocus = () => {
    setTextAreaHeight(inputRef.current?.scrollHeight)
  }
  if (isEditing || props.isEditing) {
    return (
      <Textarea
        autoFocus
        inputRef={inputRef}
        value={props.task?.value}
        overrides={{
          Root: {
            style: () => ({
              border: 'none',
            }),
          },
          Input: {
            style: ({ $theme }) => {
              return {
                backgroundColor: '#FFF',
                paddingLeft: 0,
                color: $theme.colors[props.task?.isCompleted ? 'mono600' : 'primaryA'],
                overflow: 'hidden',
                height: textAreaHeight + 'px',
                padding: '0px',
              }
            }
          }
        }}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            // @ts-ignore
            handleEditDone(e.target.value)
          }
        }}
        onBlur={handleBlurInput}
        onFocus={handleFocus}
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

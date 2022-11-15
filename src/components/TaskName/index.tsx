import {ChangeEvent, FocusEvent, useEffect, useRef, useState} from "react";
import {useTaskStore} from "@/utils/store";
import {Textarea} from "baseui/textarea";

type Props = {
  task?: Task;
  onClick?: () => void;
}

export default function TaskName (props: Props) {
  const editTask = useTaskStore(state => state.editTask)
  const addTask = useTaskStore(state => state.addTask)
  const deleteTask = useTaskStore(state => state.deleteTask)
  const setIsEditingNew = useTaskStore(state => state.setIsEditingNew)
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [textAreaHeight, setTextAreaHeight] = useState<number | undefined>(24)
  const isAddingNewTask = props.task === undefined

  const handleEditDone = (value: string) => {
    setIsEditingNew(false)
    if (isAddingNewTask && value !== '') {
      addTask(value)
    }
    if (props.task && value === '') {
      deleteTask(props.task.id)
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

  useEffect(() => {
    setTextAreaHeight(inputRef.current?.scrollHeight)
  }, [])

  return (
    <Textarea
      autoFocus={isAddingNewTask}
      inputRef={inputRef}
      value={props.task?.name}
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
      onChange={handleInputChange}
    />
  )
}

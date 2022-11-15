import NameTextArea from "@/components/NameForm/NameTextArea";
import {ChangeEvent, KeyboardEvent, useEffect, useState} from "react";
import Task from "@/components/Task";
import {useTaskStore} from "@/utils/store";

type Props = {
  data?: Task;
}

export default function NameForm (props: Props) {
  const [name, setName] = useState<TaskText>()
  const [remark, setRemark] = useState<TaskText>()
  const isEditingNew = useTaskStore(state => state.isEditingNew)
  const setIsEditingNew = useTaskStore(state => state.setIsEditingNew)
  const addTask = useTaskStore(state => state.addTask)
  const editTask = useTaskStore(state => state.editTask)
  const deleteTask = useTaskStore(state => state.deleteTask)

  const handleEditDone = () => {
    setIsEditingNew(false)

    if (!props.data) {
      if (name) {
        addTask(name,remark)
      }
    } else if (!name) {
      deleteTask(props.data.id)
    } else {
      editTask(props.data)
    }
  }
  const handleNameChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(e.target.value)
  }

  const handleNameBlur = () => {
    handleEditDone()
  }

  const handleNameKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      handleEditDone()
    }
  }

  const handleRemarkChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRemark(e.target.value)
  }

  const handleRemarkBlur = () => {
    handleEditDone()
  }

  useEffect(() => {
    setName(props.data?.name)
    setRemark(props.data?.remark)
  }, [])

  if (name || isEditingNew) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <NameTextArea
          autoFocus={props.data === undefined}
          value={name}
          isGray={props.data?.isCompleted}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          onKeyPress={handleNameKeyPress}
        />
        {props.data !== undefined &&
          <NameTextArea
            value={remark}
            isMini
            onChange={handleRemarkChange}
            onBlur={handleRemarkBlur}
          />
        }
      </div>
    )
  }

  return null
}

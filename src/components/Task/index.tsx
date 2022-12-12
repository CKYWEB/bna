import {Checkbox} from "baseui/checkbox";
import {ListItem} from "baseui/list";
import {useTaskStore} from "@/utils/store";
import {Button, SHAPE, SIZE} from "baseui/button";
import {Overflow} from "baseui/icon";
import {ChangeEvent, KeyboardEvent, useEffect, useState} from "react";
import TaskTextArea from "@/components/Task/TaskTextArea";

type Props = {
  data?: Task;
}

export default function Task (props: Props) {
  const toggleTask = useTaskStore(state => state.toggleTask)
  const isEditingNew = useTaskStore(state => state.isEditingNew)
  const [name, setName] = useState<TaskText>()
  const [remark, setRemark] = useState<TaskText>()
  const [isFocusing, setFocusing] = useState<Boolean>(false)
  const setIsEditingNew = useTaskStore(state => state.setIsEditingNew)
  const addTask = useTaskStore(state => state.addTask)
  const editTask = useTaskStore(state => state.editTask)
  const deleteTask = useTaskStore(state => state.deleteTask)

  const handleCheckChange = (targetId: string | undefined) => {
    if (targetId) {
      toggleTask(targetId)
    }
  }

  const handleEditDone = () => {
    setFocusing(false)
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

  const handleFocusText = () => {
    setFocusing(true)
  }

  useEffect(() => {
    setName(props.data?.name)
    setRemark(props.data?.remark)
  }, [])

  return (
    <ListItem
      artwork={() => (
        <Checkbox
          checked={props.data?.isCompleted}
          onChange={() => handleCheckChange(props.data?.id)}
          disabled={props.data === undefined}
        />
      )}
      endEnhancer={() => (
        isFocusing && !isEditingNew ?
          <Button size={SIZE.mini} shape={SHAPE.circle}>
            <Overflow size={16} />
          </Button> :
          null
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
      {name !== undefined || isEditingNew ?
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <TaskTextArea
            autoFocus={props.data === undefined}
            value={name}
            isGray={props.data?.isCompleted}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            onFocus={handleFocusText}
            onKeyPress={handleNameKeyPress}
          />
          {props.data !== undefined &&
            <TaskTextArea
              value={remark}
              isMini
              onChange={handleRemarkChange}
              onFocus={handleFocusText}
              onBlur={handleRemarkBlur}
            />
          }
        </div>
        : null
      }
    </ListItem>
  )
}

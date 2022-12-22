import TaskTextArea from '@/components/Task/TaskTextArea';
import { useTaskStore } from '@/utils/store';
import { Button, SHAPE, SIZE } from 'baseui/button';
import { Checkbox } from 'baseui/checkbox';
import { Overflow } from 'baseui/icon';
import { ListItem } from 'baseui/list';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

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
          disabled={props.data === undefined}
          onChange={() => handleCheckChange(props.data?.id)}
        />
      )}
      endEnhancer={() => (
        isFocusing && !isEditingNew ?
          <Button
            shape={SHAPE.circle}
            size={SIZE.mini}>
            <Overflow size={16} />
          </Button> :
          null
      )}
      overrides={{
        Root: {
          style: () => ({
            alignItems: 'baseline',
          }),
        },
        Content: {
          style: () => ({
            minHeight: '0px',
            padding: '16px 0',
          }),
        },
      }}
      key={props.data?.id}
    >
      {name !== undefined || isEditingNew ?
        <div style={{display: 'flex', flexDirection: 'column',}}>
          <TaskTextArea
            autoFocus={props.data === undefined}
            isGray={props.data?.isCompleted}
            value={name}
            onBlur={handleNameBlur}
            onChange={handleNameChange}
            onFocus={handleFocusText}
            onKeyPress={handleNameKeyPress}
          />
          {props.data !== undefined &&
            <TaskTextArea
              isMini
              value={remark}
              onBlur={handleRemarkBlur}
              onChange={handleRemarkChange}
              onFocus={handleFocusText}
            />
          }
        </div>
        : null
      }
    </ListItem>
  )
}

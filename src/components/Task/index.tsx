import TaskTextArea from '@/components/Task/TaskTextArea';
import { useTaskStore } from '@/utils/store';
import { Button, SHAPE, SIZE as BUTTONSIZE } from 'baseui/button';
import { Checkbox } from 'baseui/checkbox';
import { Overflow } from 'baseui/icon';
import { ListItem } from 'baseui/list';
import { Modal, ModalBody, ModalButton, ModalFooter, ModalHeader, SIZE as MODALSIZE } from 'baseui/modal';
import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';

type Props = {
  data?: Task;
}

export default function Task (props: Props) {
  const toggleTask = useTaskStore(state => state.toggleTask)
  const isEditingNew = useTaskStore(state => state.isEditingNew)
  const isFocusingText = useTaskStore(state => state.currentFocusTextId) === props.data?.id
  const isFocusingTask = useTaskStore(state => state.currentFocusTaskId) === props.data?.id
  const [name, setName] = useState<TaskText>()
  const [remark, setRemark] = useState<TaskText>()
  const [isCheckingMore, setCheckingMore] = useState(false)
  const setIsEditingNew = useTaskStore(state => state.setIsEditingNew)
  const addTask = useTaskStore(state => state.addTask)
  const editTask = useTaskStore(state => state.editTask)
  const deleteTask = useTaskStore(state => state.deleteTask)
  const changeFocus = useTaskStore(state => state.changeFocus)

  const handleMoreBtnClick = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLDivElement>) => {
    if (e.relatedTarget?.id === 'btn--more') {
      handleMoreOpen()
      return true
    }

    return false
  }

  const handleCheckChange = (targetId: string | undefined) => {
    if (targetId) {
      toggleTask(targetId)
    }
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(e.target.value)
  }

  const handleTextBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleMoreBtnClick(e)
    setIsEditingNew(false)

    if (!props.data) {
      if (name) {
        addTask(name,remark)
      }
    } else if (!name) {
      deleteTask(props.data.id)
    } else {
      editTask(props.data.id, {name, remark,})
    }
  }

  const handleRemarkChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRemark(e.target.value)
  }

  const handleTextFocus = () => {
    changeFocus(props.data?.id, 'TEXT')
  }

  const handleMoreOpen = () => {
    setCheckingMore(true)
  }

  const handleMoreClose = () => {
    setCheckingMore(false)
  }

  const handleTaskFocus = () => {
    changeFocus(props.data?.id, 'TASK')
  }

  const handleTaskBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!handleMoreBtnClick(e)) {
      changeFocus(undefined)
    }
  }

  useEffect(() => {
    setName(props.data?.name)
    setRemark(props.data?.remark)
  }, [])

  return (
    <div
      style={{
        cursor: 'pointer',
      }}
      tabIndex={0}
      onBlur={handleTaskBlur}
      onFocus={handleTaskFocus}
    >
      <ListItem
        artwork={() => (
          <Checkbox
            checked={props.data?.isCompleted}
            disabled={props.data === undefined}
            onChange={() => handleCheckChange(props.data?.id)}
          />
        )}
        endEnhancer={() => (
          <Button
            style={{
              display: (isFocusingText || isFocusingTask) && !isEditingNew ? undefined: 'none',
            }}
            id="btn--more"
            shape={SHAPE.circle}
            size={BUTTONSIZE.compact}
            onClick={handleMoreOpen}
          >
            <Overflow size={20}/>
          </Button>
        )}
        overrides={{
          Root: {
            style: ({ $theme, }) => ({
              border: '1px solid',
              borderColor: $theme.colors[isFocusingTask ? 'primary300' : 'primaryB'],
            }),
          },
          Content: {
            style: () => ({
              minHeight: '0px',
              padding: '16px 0',
              border: 'none',
            }),
          },
          EndEnhancerContainer: {
            style: () => ({
              flexBasis: '45px',
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
              onBlur={handleTextBlur}
              onChange={handleNameChange}
              onFocus={handleTextFocus}
            />
            {props.data !== undefined &&
              <TaskTextArea
                isMini
                value={remark}
                onBlur={handleTextBlur}
                onChange={handleRemarkChange}
                onFocus={handleTextFocus}
              />
            }
          </div>
          : null
        }
      </ListItem>
      <Modal
        isOpen={isCheckingMore}
        size={MODALSIZE.auto}
        onClose={handleMoreClose}
      >
        <ModalHeader>Details</ModalHeader>
        <ModalBody>
          {props.data?.name}
        </ModalBody>
        <ModalFooter>
          <ModalButton
            kind="tertiary"
            onClick={handleMoreClose}
          >
            Cancel
          </ModalButton>
          <ModalButton onClick={handleMoreClose}>Done</ModalButton>
        </ModalFooter>
      </Modal>
    </div>
  )
}

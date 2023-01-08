import TaskTextArea from '@/components/Task/TaskTextArea';
import { useTaskStore } from '@/utils/store';
import { Button, SHAPE, SIZE as BUTTONSIZE } from 'baseui/button';
import { Checkbox } from 'baseui/checkbox';
import { Overflow } from 'baseui/icon';
import { ListItem } from 'baseui/list';
import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { Block } from "baseui/block";

type Props = {
  data?: Task;
  onClickMore?: () => void;
}

const MORE_BTN_ID = 'btn--more'
const REMARK_TEXTAREA_ID = 'textarea--remark'

export default function Task (props: Props) {
  const toggleTask = useTaskStore(state => state.toggleTask)
  const isEditingNew = useTaskStore(state => state.isEditingNew)
  const isFocusingText = useTaskStore(state => state.currentFocusTextId) === props.data?.id
  const isFocusingTask = useTaskStore(state => state.currentFocusTaskId) === props.data?.id
  const [name, setName] = useState<TaskText>()
  const [remark, setRemark] = useState<TaskText>()
  const setIsEditingNew = useTaskStore(state => state.setIsEditingNew)
  const addTask = useTaskStore(state => state.addTask)
  const editTask = useTaskStore(state => state.editTask)
  const deleteTask = useTaskStore(state => state.deleteTask)
  const changeFocus = useTaskStore(state => state.changeFocus)

  const handleMoreBtnClick = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLDivElement>) => {
    if (e.relatedTarget?.id === MORE_BTN_ID) {
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
        addTask({ name, remark })
      }
    } else if (!name) {
      deleteTask(props.data.id)
    } else {
      editTask(props.data.id, { name, remark })
    }
  }

  const handleRemarkChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRemark(e.target.value)
  }

  const handleTextFocus = () => {
    changeFocus(props.data?.id, 'TEXT')
  }

  const handleMoreOpen = () => {
    if (props.onClickMore) {
      props.onClickMore()
    }
  }

  const handleTaskFocus = () => {
    changeFocus(props.data?.id, 'TASK')
  }

  const handleTaskBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!handleMoreBtnClick(e) && e.relatedTarget?.id !== REMARK_TEXTAREA_ID) {
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
            onMouseUp={() => handleCheckChange(props.data?.id)}
          />
        )}
        endEnhancer={() => (
          <Button
            style={{
              display: (isFocusingText || isFocusingTask) && !isEditingNew ? undefined: 'none',
            }}
            id={MORE_BTN_ID}
            shape={SHAPE.circle}
            size={BUTTONSIZE.mini}
            onClick={handleMoreOpen}
          >
            <Overflow size={20}/>
          </Button>
        )}
        overrides={{
          Root: {
            style: ({ $theme }) => ({
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: $theme.colors[isFocusingTask ? 'primary300' : 'primaryB'],
              borderTopLeftRadius: '12px',
              borderBottomLeftRadius: '12px',
              borderTopRightRadius: '12px',
              borderBottomRightRadius: '12px',
            }),
          },
          Content: {
            style: () => ({
              minHeight: '0px',
              paddingTop: '16px',
              paddingBottom: '16px',
              paddingLeft: '0px',
              paddingRight: '0px',
              borderLeftStyle: 'none',
              borderRightStyle: 'none',
              borderTopStyle: 'none',
              borderBottomStyle: 'none',
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TaskTextArea
              autoFocus={props.data === undefined}
              isGray={props.data?.isCompleted}
              value={name}
              onBlur={handleTextBlur}
              onChange={handleNameChange}
              onFocus={handleTextFocus}
            />
            {(props.data?.remark !== undefined || isFocusingTask || isFocusingText) &&
              <TaskTextArea
                id={REMARK_TEXTAREA_ID}
                isGray={props.data?.isCompleted}
                isMini
                value={remark}
                onBlur={handleTextBlur}
                onChange={handleRemarkChange}
                onFocus={handleTextFocus}
              />
            }
            {props.data?.deadline ?
              <Block
                overrides={{
                  Block:{
                    style: ({ $theme }) => {
                      return {
                        color: $theme.colors['primaryA'],
                        fontSize: '12px',
                      }
                    },
                  },
                }}
              >
                {props.data.deadline}
              </Block> : null
            }
          </div>
          : null
        }
      </ListItem>
    </div>
  )
}

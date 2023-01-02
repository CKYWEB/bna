import Task from "@/components/Task";
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader, SIZE as MODALSIZE} from "baseui/modal";
import {useEffect, useState} from "react";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {useTaskStore} from "@/utils/store";
import {Textarea} from "baseui/textarea";

type Props = {
  open: boolean;
  onClose: () => void;
  initialData: Task
}

export default function Details (props: Props) {
  const {initialData,}=props
  const [name, setName] = useState<TaskText>()
  const [remark, setRemark] = useState<TaskText>()
  const editTask = useTaskStore(state => state.editTask)

  const handleExit = () => {
    props.onClose()
  }

  const handleDone = async () => {
    await editTask(initialData.id, {name, remark,})
    props.onClose()
  }

  useEffect(() => {
    setName(initialData.name)
    setRemark(initialData.remark)
  }, [initialData])

  return (
    <Modal
      isOpen={props.open}
      size={MODALSIZE.full}
      onClose={handleExit}
    >
      <ModalHeader>Details</ModalHeader>
      <ModalBody>
        <FormControl label="Name">
          <Input
            value={name}
            onChange={event => setName(event.currentTarget.value)}
          />
        </FormControl>
        <FormControl label="Remark">
          <Textarea
            value={remark}
            onChange={event => setRemark(event.currentTarget.value)}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton
          kind="tertiary"
          onClick={props.onClose}
        >
          Cancel
        </ModalButton>
        <ModalButton onClick={handleDone}>Done</ModalButton>
      </ModalFooter>
    </Modal>
  )
}

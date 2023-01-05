import Task from "@/components/Task";
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader, SIZE as MODALSIZE} from "baseui/modal";
import {useEffect, useState} from "react";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {useTaskStore} from "@/utils/store";
import {Textarea} from "baseui/textarea";
import {DatePicker, TimePicker} from "baseui/datepicker";
import {format} from "date-fns";

type Props = {
  open: boolean;
  onClose: () => void;
  initialData: Task
}

export default function Details (props: Props) {
  const {initialData,}=props
  const [name, setName] = useState<TaskText>()
  const [remark, setRemark] = useState<TaskText>()
  const [date, setDate] = useState<[Date]>([new Date()]);
  const [time, setTime] = useState(new Date());
  const editTask = useTaskStore(state => state.editTask)

  const generateDateObj = (d: Date, t: Date) => {
    const tempDate = format(d, 'yyyy-MM-dd')
    const tempTime = format(t, 'HH:mm')

    return new Date(`${tempDate} ${tempTime}`)
  }

  const handleExit = () => {
    props.onClose()
  }

  const handleDone = async () => {
    editTask(initialData.id, {name, remark, deadline: generateDateObj(date[0],time),})
    props.onClose()
  }

  useEffect(() => {
    setName(initialData.name)
    setRemark(initialData.remark)

    const dateObj = new Date(initialData.deadline)

    setDate([dateObj])
    setTime(dateObj)
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
        <FormControl label="Date">
          <DatePicker
            value={date}
            onChange={({ date, }) => {
              if (date && !Array.isArray(date)) {
                setDate([date])
              }
            }}
          />
        </FormControl>
        <FormControl label="Time">
          <TimePicker
            format="24"
            step={300}
            value={time}
            onChange={time => setTime(time as Date)}
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

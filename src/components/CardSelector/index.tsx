import { useTaskStore } from "@/utils/store";
import {OnChangeParams, Select, Value} from "baseui/select";
import {useState} from "react";

type TaskTypeOption = {
  label: string,
  id: TaskTypeId,
}
const CARD_TYPES: TaskTypeOption[] = [
  { label: "Before", id: "0", },
  { label: "Now", id: "1", },
  { label: "After", id: "2", }
]

export default function CardSelector () {
  const [value, setValue] = useState<Value>([CARD_TYPES[1]]);
  const setCurrentTaskType = useTaskStore(state => state.setCurrentTaskType)
  const handleSelectChange = (p: OnChangeParams) => {
    setValue(p.value)
    setCurrentTaskType(p.value[0].id as TaskTypeId)
  }

  return (
    <Select
      overrides={{
        ValueContainer: {
          style: {
            backgroundColor: '#FFF',
            fontSize: '18px',
            fontWeight: 700,
          },
        },
        IconsContainer: {
          style: {
            backgroundColor: '#FFF',
          },
        },
      }}
      clearable={false}
      labelKey="label"
      options={CARD_TYPES}
      searchable={false}
      size="large"
      value={value}
      onChange={handleSelectChange}
    />
  )
}

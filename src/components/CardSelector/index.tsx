import {Select, Value} from "baseui/select";
import {useState} from "react";

const CARD_TYPES = [
  { label: "Before", id: "Before", },
  { label: "Now", id: "Now", },
  { label: "After", id: "After", }
]

export default function CardSelector () {
  const [value, setValue] = useState<Value>([CARD_TYPES[1]]);

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
      labelKey="id"
      options={CARD_TYPES}
      searchable={false}
      size="large"
      value={value}
      onChange={params => setValue(params.value)}
    />
  )
}

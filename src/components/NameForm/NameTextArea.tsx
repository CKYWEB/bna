import {ChangeEvent, FocusEvent, KeyboardEvent, useRef} from "react";
import {SIZE, Textarea} from "baseui/textarea";
import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";

type Props = {
  value: TaskText;
  autoFocus?: boolean;
  isGray?: boolean;
  isMini?: boolean;
  onKeyPress?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function NameTextArea (props: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const {onKeyPress, onBlur, onChange} = props

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (onKeyPress) {
      onKeyPress(e)
    }
  }

  const handleInputBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onBlur) {
      onBlur(e)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e)
    }
  }

  useAutosizeTextArea(inputRef, props.value);

  return (
    <Textarea
      inputRef={inputRef}
      autoFocus={props.autoFocus}
      size={props.isMini ? SIZE.mini : undefined}
      value={props.value}
      placeholder={props.isMini ? 'add notes' : undefined}
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
              color: $theme.colors[props.isGray ? 'mono600' : 'primaryA'],
              overflow: 'hidden',
              padding: '0px',
            }
          }
        }
      }}
      onKeyPress={handleKeyPress}
      onBlur={handleInputBlur}
      onChange={handleInputChange}
    />
  )
}

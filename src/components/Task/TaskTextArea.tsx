import useAutosizeTextArea from '@/hooks/useAutosizeTextArea';
import { SIZE, Textarea } from 'baseui/textarea';
import { ChangeEvent, FocusEvent, KeyboardEvent, useRef } from 'react';

type Props = {
  value: TaskText;
  autoFocus?: boolean;
  isGray?: boolean;
  isMini?: boolean;
  onKeyPress?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function TaskTextArea (props: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const {onKeyPress, onBlur, onChange, onFocus,} = props

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

  const handleInputFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onFocus) {
      onFocus(e)
    }
  }

  useAutosizeTextArea(inputRef, props.value);

  return (
    <Textarea
      overrides={{
        Root: {
          style: () => ({
            border: 'none',
            userSelect: 'none',
          }),
        },
        Input: {
          style: ({ $theme, }) => {
            return {
              backgroundColor: '#FFF',
              paddingLeft: 0,
              color: $theme.colors[props.isGray ? 'mono600' : 'primaryA'],
              overflow: 'hidden',
              padding: '0px',
            }
          },
        },
      }}
      autoFocus={props.autoFocus}
      inputRef={inputRef}
      placeholder={props.isMini ? 'add notes' : undefined}
      size={props.isMini ? SIZE.mini : undefined}
      value={props.value}
      onBlur={handleInputBlur}
      onChange={handleInputChange}
      onFocus={handleInputFocus}
      onKeyPress={handleKeyPress}
    />
  )
}

import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { formatDateInputDisplay, parseDateInputDisplay } from '@/lib/mail-date'

interface MailDateInputProps {
  id?: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  onFocus?: () => void
  onBlur?: () => void
  className?: string
}

export function MailDateInput({
  id,
  value,
  onChange,
  disabled,
  onFocus,
  onBlur,
  className,
}: MailDateInputProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState('')

  const text = isEditing ? editText : formatDateInputDisplay(value)

  return (
    <Input
      id={id}
      type="text"
      inputMode="numeric"
      placeholder="ДД/ММ/ГГГГ"
      value={text}
      onChange={(event) => setEditText(event.target.value)}
      onFocus={() => {
        setEditText(formatDateInputDisplay(value))
        setIsEditing(true)
        onFocus?.()
      }}
      onBlur={() => {
        setIsEditing(false)

        const parsed = parseDateInputDisplay(editText)
        if (parsed) {
          onChange(parsed)
        }

        onBlur?.()
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.currentTarget.blur()
        }
      }}
      disabled={disabled}
      className={className}
    />
  )
}

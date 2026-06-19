import { Clock, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useMail } from '@/context/mail-context'
import {
  getScheduleDelayLabel,
  SCHEDULE_DELAY_OPTIONS,
  type ScheduleDelayMs,
} from '@/lib/mail-schedule'
import { cn } from '@/lib/utils'

const CLOSE_DELAY_MS = 120

export function CornerHoverPopover() {
  const {
    specialMail,
    isSchedulePending,
    scheduleDelayMs,
    pendingDelayMs,
    setScheduleDelayMs,
    scheduleSpecialMail,
    removeSpecialMail,
  } = useMail()
  const [open, setOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const selectOpenRef = useRef(false)

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const handleOpen = () => {
    clearCloseTimer()
    setOpen(true)
  }

  const handleClose = () => {
    clearCloseTimer()
    closeTimerRef.current = setTimeout(() => {
      if (selectOpenRef.current) return
      setOpen(false)
    }, CLOSE_DELAY_MS)
  }

  const handleSelectOpenChange = (isOpen: boolean) => {
    selectOpenRef.current = isOpen
    if (isOpen) {
      clearCloseTimer()
      setOpen(true)
    }
  }

  const keepMenuOpen = () => {
    clearCloseTimer()
    setOpen(true)
  }

  useEffect(() => {
    return () => clearCloseTimer()
  }, [clearCloseTimer])

  const pendingLabel = pendingDelayMs !== null ? getScheduleDelayLabel(pendingDelayMs) : ''
  const scheduleButtonLabel = isSchedulePending
    ? pendingDelayMs === 0
      ? 'Добавление...'
      : `Письмо через ${pendingLabel}...`
    : specialMail
      ? 'Письмо уже добавлено'
      : `Добавить письмо (${getScheduleDelayLabel(scheduleDelayMs)})`

  return (
    <>
      <div
        aria-hidden
        className="fixed right-0 bottom-0 z-50 size-20 opacity-0"
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      />

      {open && (
        <div
          className={cn(
            'fixed right-0 bottom-0 z-50 w-72 origin-bottom border border-b-0 border-[#e5e5e5] bg-white shadow-lg transition-transform duration-200',
            'rounded-tl-xl',
          )}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          onMouseDown={keepMenuOpen}
        >
          <div className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both p-3 duration-200 delay-300">
            <p className="mb-2 text-[11px] font-medium tracking-wide text-[#999] uppercase">
              Настройки
            </p>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="schedule-delay" className="text-[12px] text-[#666]">
                  Отправить через
                </Label>
                <Select
                  value={String(scheduleDelayMs)}
                  onOpenChange={handleSelectOpenChange}
                  onValueChange={(value) =>
                    setScheduleDelayMs(Number(value) as ScheduleDelayMs)
                  }
                  disabled={isSchedulePending || Boolean(specialMail)}
                >
                  <SelectTrigger
                    id="schedule-delay"
                    className="h-9 w-full border-[#e0e0e0] text-[13px] shadow-none"
                    onPointerDown={keepMenuOpen}
                  >
                    <SelectValue placeholder="Выберите время" />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    side="top"
                    align="start"
                    onPointerEnter={keepMenuOpen}
                    onPointerLeave={handleClose}
                    onCloseAutoFocus={(event) => event.preventDefault()}
                  >
                    {SCHEDULE_DELAY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={String(option.value)}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="button"
                variant="outline"
                className="h-9 w-full justify-start gap-2 border-[#e0e0e0] text-[13px] shadow-none"
                onClick={scheduleSpecialMail}
                disabled={isSchedulePending || Boolean(specialMail)}
              >
                <Clock className="size-4 opacity-70" />
                {scheduleButtonLabel}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-9 w-full justify-start gap-2 border-[#e0e0e0] text-[13px] text-[#d32f2f] shadow-none hover:bg-[#fff5f5] hover:text-[#d32f2f]"
                onClick={removeSpecialMail}
                disabled={!specialMail && !isSchedulePending}
              >
                <Trash2 className="size-4 opacity-70" />
                Удалить спец. письмо
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

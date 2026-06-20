import { ChevronLeft, ChevronRight, Clock, Settings2, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useMail, type SpecialMailKey } from '@/context/mail-context'
import { useShootSettings } from '@/context/shoot-settings-context'
import { MailDateInput } from '@/components/mail/mail-date-input'

import {
  getScheduleDelayLabel,
  SCHEDULE_DELAY_OPTIONS,
  type ScheduleDelayMs,
} from '@/lib/mail-schedule'
import { cn } from '@/lib/utils'

const HIDE_DELAY_MS = 150
const PANEL_WIDTH = 'w-[36rem]'

interface SpecialMailSettingsColumnProps {
  title: string
  slotKey: SpecialMailKey
  scheduleDelayId: string
  slot: {
    mail: { id: string } | null
    isSchedulePending: boolean
    scheduleDelayMs: ScheduleDelayMs
    pendingDelayMs: ScheduleDelayMs | null
    mailArrivalDate: string
    setScheduleDelayMs: (delayMs: ScheduleDelayMs) => void
    setMailArrivalDate: (value: string) => void
    schedule: () => void
    remove: () => void
  }
  onDateFocus: () => void
  onDateBlur: () => void
}

const SLOT_LABELS: Record<SpecialMailKey, string> = {
  first: 'Письмо 1',
  second: 'Письмо 2 с видео',
}

const SLOT_ACCENT: Record<SpecialMailKey, string> = {
  first: 'bg-[#edf4ff] text-[#005ff9] border-[#c8dcff]',
  second: 'bg-[#f3edff] text-[#7c4dff] border-[#dccfff]',
}

function SpecialMailSettingsColumn({
  title,
  slotKey,
  scheduleDelayId,
  slot,
  onDateFocus,
  onDateBlur,
}: SpecialMailSettingsColumnProps) {
  const pendingLabel =
    slot.pendingDelayMs !== null ? getScheduleDelayLabel(slot.pendingDelayMs) : ''
  const scheduleButtonLabel = slot.isSchedulePending
    ? slot.pendingDelayMs === 0
      ? 'Добавление...'
      : `Письмо через ${pendingLabel}...`
    : slot.mail
      ? 'Письмо уже добавлено'
      : `Добавить письмо (${getScheduleDelayLabel(slot.scheduleDelayMs)})`

  return (
    <div className="flex w-72 shrink-0 flex-col p-3">
      <div
        className={cn(
          'mb-3 inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase',
          SLOT_ACCENT[slotKey],
        )}
      >
        {title}
      </div>

      <div className="space-y-3 rounded-lg border border-[#ececec] bg-[#fafafa] p-3">
        <div className="space-y-1.5">
          <Label htmlFor={scheduleDelayId} className="text-[12px] text-[#666]">
            Отправить через
          </Label>
          <select
            id={scheduleDelayId}
            value={String(slot.scheduleDelayMs)}
            onChange={(event) =>
              slot.setScheduleDelayMs(Number(event.target.value) as ScheduleDelayMs)
            }
            disabled={slot.isSchedulePending || Boolean(slot.mail)}
            className="h-9 w-full rounded-lg border border-[#e0e0e0] bg-white px-2.5 text-[13px] text-[#333] shadow-none outline-none focus:border-[#7c4dff] focus:ring-2 focus:ring-[#7c4dff]/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {SCHEDULE_DELAY_OPTIONS.map((option) => (
              <option key={option.value} value={String(option.value)}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-9 w-full justify-start gap-2 border-[#d6e4ff] bg-white text-[13px] text-[#005ff9] shadow-none hover:bg-[#edf4ff] hover:text-[#005ff9]"
          onClick={slot.schedule}
          disabled={slot.isSchedulePending || Boolean(slot.mail)}
        >
          <Clock className="size-4 opacity-70" />
          {scheduleButtonLabel}
        </Button>

        <div className="space-y-1.5">
          <Label htmlFor={`mail-date-${slotKey}`} className="text-[12px] text-[#666]">
            Дата письма
          </Label>
          <MailDateInput
            id={`mail-date-${slotKey}`}
            value={slot.mailArrivalDate}
            onChange={slot.setMailArrivalDate}
            onFocus={onDateFocus}
            onBlur={onDateBlur}
            disabled={slot.isSchedulePending}
            className="h-9 border-[#e0e0e0] bg-white text-[13px] shadow-none"
          />
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-9 w-full justify-start gap-2 border-[#e0e0e0] text-[13px] text-[#d32f2f] shadow-none hover:bg-[#fff5f5] hover:text-[#d32f2f]"
          onClick={slot.remove}
          disabled={!slot.mail && !slot.isSchedulePending}
        >
          <Trash2 className="size-4 opacity-70" />
          Удалить спец. письмо
        </Button>
      </div>
    </div>
  )
}

export function CornerHoverPopover() {
  const { specialMailSlots } = useMail()
  const { isOpen, toggleSettings, closeSettings } = useShootSettings()
  const [cornerHover, setCornerHover] = useState(false)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const datePickerOpenCountRef = useRef(0)

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current)
      hideTimerRef.current = null
    }
  }, [])

  const handleZoneEnter = () => {
    clearHideTimer()
    setCornerHover(true)
  }

  const handleZoneLeave = () => {
    clearHideTimer()

    hideTimerRef.current = setTimeout(() => {
      if (datePickerOpenCountRef.current > 0) return
      setCornerHover(false)
      closeSettings()
    }, HIDE_DELAY_MS)
  }

  const handleDateFocus = () => {
    datePickerOpenCountRef.current += 1
    clearHideTimer()
  }

  const handleDateBlur = () => {
    datePickerOpenCountRef.current = Math.max(0, datePickerOpenCountRef.current - 1)
  }

  useEffect(() => {
    return () => clearHideTimer()
  }, [clearHideTimer])

  const showToggle = cornerHover || isOpen

  return (
    <>
      {!isOpen && (
        <div
          aria-hidden
          className="fixed right-0 bottom-0 z-50 size-20"
          onMouseEnter={handleZoneEnter}
          onMouseLeave={handleZoneLeave}
        />
      )}

      <div
        className="fixed right-0 bottom-0 z-50 flex items-end"
        onMouseEnter={handleZoneEnter}
        onMouseLeave={handleZoneLeave}
      >
        <div
          className={cn(
            'overflow-hidden transition-[width] duration-300 ease-out',
            isOpen ? PANEL_WIDTH : 'w-0',
          )}
        >
          <aside
            aria-hidden={!isOpen}
            className={cn(
              `${PANEL_WIDTH} shrink-0 overflow-hidden border-2 border-r-0 border-[#7c4dff] bg-white`,
              'rounded-tl-xl shadow-[0_-8px_32px_rgba(124,77,255,0.28)]',
              !isOpen && 'pointer-events-none',
            )}
          >
            <div className="flex items-center gap-2 border-b border-[#eadfff] bg-gradient-to-r from-[#7c4dff] to-[#6a3de8] px-4 py-2.5">
              <Settings2 className="size-4 text-white" />
              <p className="text-[13px] font-semibold tracking-wide text-white uppercase">
                Настройки съёмки
              </p>
            </div>

            <div className="flex divide-x divide-[#eadfff] bg-[#fcfbff]">
              {(Object.keys(SLOT_LABELS) as SpecialMailKey[]).map((key) => (
                <SpecialMailSettingsColumn
                  key={key}
                  slotKey={key}
                  title={SLOT_LABELS[key]}
                  scheduleDelayId={`schedule-delay-${key}`}
                  slot={specialMailSlots[key]}
                  onDateFocus={handleDateFocus}
                  onDateBlur={handleDateBlur}
                />
              ))}
            </div>
          </aside>
        </div>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Скрыть настройки' : 'Открыть настройки'}
          className={cn(
            'flex h-11 items-center justify-center border-2 border-[#6a3de8] bg-[#7c4dff] text-white transition-all duration-200 hover:bg-[#6a3de8]',
            isOpen
              ? 'w-8 rounded-tl-md shadow-[0_0_0_3px_rgba(124,77,255,0.35)]'
              : 'w-10 rounded-tl-lg shadow-[0_0_18px_rgba(124,77,255,0.55)]',
            showToggle
              ? 'pointer-events-auto translate-x-0 opacity-100'
              : 'pointer-events-none -translate-x-1 opacity-0',
          )}
          onClick={toggleSettings}
        >
          {isOpen ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </button>
      </div>
    </>
  )
}

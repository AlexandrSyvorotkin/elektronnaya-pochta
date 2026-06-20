import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import {
  createSecondSpecialMail,
  createSpecialMail,
  getMailById as getStaticMailById,
  getMailsByFolder as getStaticMailsByFolder,
  SPECIAL_MAIL_2_ID,
  SPECIAL_MAIL_ID,
  type MailItem,
} from '@/components/mail/mock-data'
import {
  DEFAULT_MAIL_ARRIVAL_DATE,
  formatMailListDate,
  parseDateInputValue,
  toDateInputValue,
} from '@/lib/mail-date'

import type { ScheduleDelayMs } from '@/lib/mail-schedule'

export type SpecialMailKey = 'first' | 'second'

interface SpecialMailSlot {
  mail: MailItem | null
  isSchedulePending: boolean
  scheduleDelayMs: ScheduleDelayMs
  pendingDelayMs: ScheduleDelayMs | null
  mailArrivalDate: string
  setScheduleDelayMs: (delayMs: ScheduleDelayMs) => void
  setMailArrivalDate: (value: string) => void
  schedule: () => void
  remove: () => void
}

interface MailContextValue {
  specialMailSlots: Record<SpecialMailKey, SpecialMailSlot>
  getMailsByFolder: (folderId: string) => MailItem[]
  getMailById: (mailId: string) => MailItem | undefined
}

const MailContext = createContext<MailContextValue | null>(null)

function useSpecialMailSlot(createMail: () => MailItem) {
  const [mail, setMail] = useState<MailItem | null>(null)
  const [isSchedulePending, setIsSchedulePending] = useState(false)
  const [scheduleDelayMs, setScheduleDelayMs] = useState<ScheduleDelayMs>(30_000)
  const [pendingDelayMs, setPendingDelayMs] = useState<ScheduleDelayMs | null>(null)
  const [mailArrivalDate, setMailArrivalDateState] = useState(() =>
    toDateInputValue(DEFAULT_MAIL_ARRIVAL_DATE),
  )
  const scheduleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearScheduleTimer = useCallback(() => {
    if (scheduleTimerRef.current) {
      clearTimeout(scheduleTimerRef.current)
      scheduleTimerRef.current = null
    }
  }, [])

  const setMailArrivalDate = useCallback((value: string) => {
    setMailArrivalDateState(value)

    const formattedDate = formatMailListDate(parseDateInputValue(value))
    setMail((current) => (current ? { ...current, date: formattedDate } : null))
  }, [])

  const schedule = useCallback(() => {
    clearScheduleTimer()
    setIsSchedulePending(true)
    setPendingDelayMs(scheduleDelayMs)

    const formattedDate = formatMailListDate(parseDateInputValue(mailArrivalDate))

    const addMail = () => {
      setMail({ ...createMail(), date: formattedDate })
      setIsSchedulePending(false)
      setPendingDelayMs(null)
      scheduleTimerRef.current = null
    }

    if (scheduleDelayMs === 0) {
      addMail()
      return
    }

    scheduleTimerRef.current = setTimeout(addMail, scheduleDelayMs)
  }, [clearScheduleTimer, createMail, mailArrivalDate, scheduleDelayMs])

  const remove = useCallback(() => {
    clearScheduleTimer()
    setIsSchedulePending(false)
    setPendingDelayMs(null)
    setMail(null)
  }, [clearScheduleTimer])

  useEffect(() => {
    return () => clearScheduleTimer()
  }, [clearScheduleTimer])

  return useMemo(
    () => ({
      mail,
      isSchedulePending,
      scheduleDelayMs,
      pendingDelayMs,
      mailArrivalDate,
      setScheduleDelayMs,
      setMailArrivalDate,
      schedule,
      remove,
    }),
    [
      mail,
      isSchedulePending,
      scheduleDelayMs,
      pendingDelayMs,
      mailArrivalDate,
      setMailArrivalDate,
      schedule,
      remove,
    ],
  )
}

export function MailProvider({ children }: { children: ReactNode }) {
  const firstSlot = useSpecialMailSlot(createSpecialMail)
  const secondSlot = useSpecialMailSlot(createSecondSpecialMail)

  const specialMailSlots = useMemo(
    () => ({
      first: firstSlot,
      second: secondSlot,
    }),
    [firstSlot, secondSlot],
  )

  const getMailsByFolder = useCallback(
    (folderId: string) => {
      const mails = getStaticMailsByFolder(folderId)

      if (folderId !== 'inbox') {
        return mails
      }

      const activeSpecialMails = [secondSlot.mail, firstSlot.mail].filter(
        (mail): mail is MailItem => mail !== null,
      )

      const regularMails = mails.filter(
        (mail) => mail.id !== SPECIAL_MAIL_ID && mail.id !== SPECIAL_MAIL_2_ID,
      )

      return [...activeSpecialMails, ...regularMails]
    },
    [firstSlot.mail, secondSlot.mail],
  )

  const getMailById = useCallback(
    (mailId: string) => {
      if (mailId === SPECIAL_MAIL_ID && firstSlot.mail) {
        return firstSlot.mail
      }

      if (mailId === SPECIAL_MAIL_2_ID && secondSlot.mail) {
        return secondSlot.mail
      }

      return getStaticMailById(mailId)
    },
    [firstSlot.mail, secondSlot.mail],
  )

  const value = useMemo(
    () => ({
      specialMailSlots,
      getMailsByFolder,
      getMailById,
    }),
    [specialMailSlots, getMailsByFolder, getMailById],
  )

  return <MailContext.Provider value={value}>{children}</MailContext.Provider>
}

export function useMail() {
  const context = useContext(MailContext)

  if (!context) {
    throw new Error('useMail must be used within MailProvider')
  }

  return context
}

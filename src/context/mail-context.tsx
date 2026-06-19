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
  createSpecialMail,
  getMailById as getStaticMailById,
  getMailsByFolder as getStaticMailsByFolder,
  SPECIAL_MAIL_ID,
  type MailItem,
} from '@/components/mail/mock-data'

import type { ScheduleDelayMs } from '@/lib/mail-schedule'

interface MailContextValue {
  specialMail: MailItem | null
  isSchedulePending: boolean
  scheduleDelayMs: ScheduleDelayMs
  pendingDelayMs: ScheduleDelayMs | null
  setScheduleDelayMs: (delayMs: ScheduleDelayMs) => void
  scheduleSpecialMail: () => void
  removeSpecialMail: () => void
  getMailsByFolder: (folderId: string) => MailItem[]
  getMailById: (mailId: string) => MailItem | undefined
}

const MailContext = createContext<MailContextValue | null>(null)

export function MailProvider({ children }: { children: ReactNode }) {
  const [specialMail, setSpecialMail] = useState<MailItem | null>(null)
  const [isSchedulePending, setIsSchedulePending] = useState(false)
  const [scheduleDelayMs, setScheduleDelayMs] = useState<ScheduleDelayMs>(30_000)
  const [pendingDelayMs, setPendingDelayMs] = useState<ScheduleDelayMs | null>(null)
  const scheduleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearScheduleTimer = useCallback(() => {
    if (scheduleTimerRef.current) {
      clearTimeout(scheduleTimerRef.current)
      scheduleTimerRef.current = null
    }
  }, [])

  const scheduleSpecialMail = useCallback(() => {
    clearScheduleTimer()
    setIsSchedulePending(true)
    setPendingDelayMs(scheduleDelayMs)

    const addMail = () => {
      setSpecialMail(createSpecialMail())
      setIsSchedulePending(false)
      setPendingDelayMs(null)
      scheduleTimerRef.current = null
    }

    if (scheduleDelayMs === 0) {
      addMail()
      return
    }

    scheduleTimerRef.current = setTimeout(addMail, scheduleDelayMs)
  }, [clearScheduleTimer, scheduleDelayMs])

  const removeSpecialMail = useCallback(() => {
    clearScheduleTimer()
    setIsSchedulePending(false)
    setPendingDelayMs(null)
    setSpecialMail(null)
  }, [clearScheduleTimer])

  const getMailsByFolder = useCallback(
    (folderId: string) => {
      const mails = getStaticMailsByFolder(folderId)

      if (folderId === 'inbox' && specialMail) {
        return [specialMail, ...mails.filter((mail) => mail.id !== SPECIAL_MAIL_ID)]
      }

      return mails
    },
    [specialMail],
  )

  const getMailById = useCallback(
    (mailId: string) => {
      if (mailId === SPECIAL_MAIL_ID && specialMail) {
        return specialMail
      }

      return getStaticMailById(mailId)
    },
    [specialMail],
  )

  useEffect(() => {
    return () => clearScheduleTimer()
  }, [clearScheduleTimer])

  const value = useMemo(
    () => ({
      specialMail,
      isSchedulePending,
      scheduleDelayMs,
      pendingDelayMs,
      setScheduleDelayMs,
      scheduleSpecialMail,
      removeSpecialMail,
      getMailsByFolder,
      getMailById,
    }),
    [
      specialMail,
      isSchedulePending,
      scheduleDelayMs,
      pendingDelayMs,
      scheduleSpecialMail,
      removeSpecialMail,
      getMailsByFolder,
      getMailById,
    ],
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

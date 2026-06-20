export const SCHEDULE_DELAY_OPTIONS = [
  { label: 'сразу', value: 0 },
  { label: '5 сек', value: 5_000 },
  { label: '10 сек', value: 10_000 },
  { label: '15 сек', value: 15_000 },
  { label: '20 сек', value: 20_000 },
  { label: '25 сек', value: 25_000 },
  { label: '30 сек', value: 30_000 },
  { label: '35 сек', value: 35_000 },
  { label: '40 сек', value: 40_000 },
  { label: '45 сек', value: 45_000 },
  { label: '50 сек', value: 50_000 },
  { label: '55 сек', value: 55_000 },
  { label: '1 мин', value: 60_000 },
] as const

export type ScheduleDelayMs = (typeof SCHEDULE_DELAY_OPTIONS)[number]['value']

export function getScheduleDelayLabel(delayMs: ScheduleDelayMs) {
  return (
    SCHEDULE_DELAY_OPTIONS.find((option) => option.value === delayMs)?.label ??
    `${delayMs / 1000} сек`
  )
}

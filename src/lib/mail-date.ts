const MONTH_LABELS = [
  'янв',
  'фев',
  'мар',
  'апр',
  'май',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек',
] as const

export const DEFAULT_MAIL_ARRIVAL_DATE = new Date(2027, 5, 27)

export function formatMailListDate(date: Date) {
  return `${date.getDate()} ${MONTH_LABELS[date.getMonth()]}`
}

export function toDateInputValue(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function parseDateInputValue(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function getDateParts(value: string) {
  const date = parseDateInputValue(value)

  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  }
}

export function fromDateParts(day: number, month: number, year: number) {
  return toDateInputValue(new Date(year, month - 1, day))
}

export const MAIL_DATE_YEARS = [2024, 2025, 2026, 2027, 2028, 2029, 2030]

export const MAIL_DATE_MONTHS = MONTH_LABELS.map((label, index) => ({
  value: index + 1,
  label: `${String(index + 1).padStart(2, '0')} · ${label}`,
}))

export function getDaysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate()
}

export function formatDateInputDisplay(value: string) {
  const { day, month, year } = getDateParts(value)

  return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`
}

export function parseDateInputDisplay(text: string) {
  const match = text.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (!match) return null

  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])

  if (month < 1 || month > 12) return null
  if (day < 1 || day > getDaysInMonth(month, year)) return null

  return fromDateParts(day, month, year)
}

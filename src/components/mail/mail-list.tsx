import { ChevronDown, Flag, Inbox, Paperclip, Star } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { getMailPath, groupLabels, type MailGroup, type MailItem } from './mock-data'

const groupOrder: MailGroup[] = ['today', 'yesterday', 'week', 'june']

interface MailListProps {
  title: string
  folderId: string
  count?: string
  mails: MailItem[]
  emptyMessage?: string
}

function MailRow({
  folderId,
  id,
  sender,
  subject,
  preview,
  date,
  avatarColor,
  avatarText,
  isUnread,
  isNew,
  hasAttachment,
  isStarred,
  isImportant,
}: MailItem & { folderId: string }) {
  return (
    <NavLink
      to={getMailPath(folderId, id)}
      className={({ isActive }) =>
        cn(
          'group flex w-full items-start gap-3 border-b border-[#efefef] px-4 py-3 text-left transition-colors hover:bg-[#f7f9fc]',
          isActive && 'active bg-[#edf4ff] hover:bg-[#edf4ff]',
          isImportant && 'bg-[#fff8e6] hover:bg-[#fff3d6]',
        )
      }
    >
      <div
        className={cn(
          'mt-1.5 size-2 shrink-0 rounded-full',
          isUnread ? 'bg-[#005ff9]' : 'bg-transparent group-hover:bg-[#005ff9]/30',
          'group-[.active]:bg-[#005ff9]',
        )}
      />

      <div
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white',
          avatarColor,
        )}
      >
        {avatarText}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'truncate text-[13px]',
              isUnread ? 'font-semibold text-[#111]' : 'font-medium text-[#333]',
            )}
          >
            {sender}
          </span>
          {isNew && (
            <Badge className="h-4 rounded px-1 text-[10px] font-semibold bg-[#005ff9] hover:bg-[#005ff9]">
              New
            </Badge>
          )}
        </div>
        <p
          className={cn(
            'truncate text-[13px]',
            isUnread ? 'font-medium text-[#111]' : 'text-[#333]',
          )}
        >
          {subject}
        </p>
        <p className="truncate text-[12px] text-[#888]">{preview}</p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1 pt-0.5">
        <div className="flex items-center gap-1.5">
          {hasAttachment && <Paperclip className="size-3.5 text-[#999]" />}
          {isStarred && <Star className="size-3.5 fill-[#ffc107] text-[#ffc107]" />}
          <span className="text-[12px] tabular-nums text-[#999]">{date}</span>
        </div>
        <Flag
          className={cn(
            'size-3.5',
            isImportant
              ? 'fill-[#ff9800] text-[#ff9800]'
              : 'text-transparent group-hover:text-[#ccc]',
          )}
        />
      </div>
    </NavLink>
  )
}

export function MailList({ title, folderId, count, mails, emptyMessage }: MailListProps) {
  const countLabel = count ?? String(mails.length)

  return (
    <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
      <div className="flex shrink-0 items-center justify-between border-b border-[#e5e5e5] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <h1 className="text-[15px] font-semibold text-[#111]">{title}</h1>
          <span className="text-[13px] text-[#999]">{countLabel} писем</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-[12px] text-[#666] hover:bg-[#f0f0f0]"
          >
            Выделить все
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-[12px] text-[#666] hover:bg-[#f0f0f0]"
          >
            Отметить все прочитанными
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1 border-[#e0e0e0] text-[12px] text-[#666] shadow-none"
          >
            Фильтр
            <ChevronDown className="size-3" />
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {mails.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-[#999]">
            <Inbox className="size-10 opacity-40" />
            <p className="text-[14px]">{emptyMessage ?? 'Нет писем'}</p>
          </div>
        ) : (
          groupOrder.map((group) => {
            const groupedMails = mails.filter((mail) => mail.group === group)
            if (groupedMails.length === 0) return null

            return (
              <section key={group}>
                <div className="sticky top-0 z-10 border-b border-[#efefef] bg-[#fafafa] px-4 py-1.5">
                  <span className="text-[12px] font-medium text-[#888]">
                    {groupLabels[group]}
                  </span>
                </div>
                {groupedMails.map((mail) => (
                  <MailRow key={mail.id} {...mail} folderId={folderId} />
                ))}
              </section>
            )
          })
        )}
      </div>
    </main>
  )
}

import {
  ArrowLeft,
  Forward,
  MoreHorizontal,
  Paperclip,
  Reply,
  Star,
  Trash2,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

import { getFolderById, getMailBody, SPECIAL_MAIL_ID, type MailItem } from './mock-data'
import { getSpecialMailImageName, specialMailImages } from '@/assets/mail/images'

interface MailDetailProps {
  mail: MailItem
}

export function MailDetail({ mail }: MailDetailProps) {
  const folder = getFolderById(mail.folderId)
  const isSpecialMail = mail.id === SPECIAL_MAIL_ID
  const body = isSpecialMail ? '' : getMailBody(mail)
  const mailImages = isSpecialMail ? specialMailImages : (mail.images ?? [])
  const senderEmail =
    mail.sender === 'anonymus'
      ? 'anonymus@mail.ru'
      : `${mail.sender.toLowerCase().replace(/\s+/g, '')}@mail.ru`

  return (
    <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
      <div className="flex shrink-0 items-center gap-2 border-b border-[#e5e5e5] px-4 py-2.5">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 text-[12px] text-[#666] hover:bg-[#f0f0f0]"
          asChild
        >
          <Link to={folder?.path ?? '/inbox'}>
            <ArrowLeft className="size-3.5" />
            {folder?.label ?? 'Назад'}
          </Link>
        </Button>

        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" className="size-7 text-[#666]">
            <Reply className="size-3.5" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="size-7 text-[#666]">
            <Forward className="size-3.5" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="size-7 text-[#666]">
            <Star className={cn('size-3.5', mail.isStarred && 'fill-[#ffc107] text-[#ffc107]')} />
          </Button>
          <Button variant="ghost" size="icon-sm" className="size-7 text-[#666]">
            <Trash2 className="size-3.5" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="size-7 text-[#666]">
            <MoreHorizontal className="size-3.5" />
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <article className="mx-auto max-w-3xl px-6 py-6 pb-12">
          <h1 className="text-[22px] leading-snug font-semibold text-[#111]">
            {mail.subject}
          </h1>

          <div className="mt-5 flex items-start gap-3">
            <div
              className={cn(
                'flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white',
                mail.avatarColor,
              )}
            >
              {mail.avatarText}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-[14px] font-semibold text-[#111]">{mail.sender}</span>
                <span className="text-[13px] text-[#999]">&lt;{senderEmail}&gt;</span>
              </div>
              <p className="mt-0.5 text-[12px] text-[#999]">
                кому: мне · {mail.date}
              </p>
            </div>

            {mail.hasAttachment && (
              <div className="flex items-center gap-1.5 rounded-lg border border-[#e5e5e5] bg-[#fafafa] px-2.5 py-1.5 text-[12px] text-[#666]">
                <Paperclip className="size-3.5" />
                Вложение
              </div>
            )}
          </div>

          <Separator className="my-6 bg-[#efefef]" />

          {isSpecialMail ? (
            <div className="space-y-6">
              {mailImages.length > 0 ? (
                mailImages.map((src, index) => (
                  <figure key={`${src}-${index}`} className="overflow-hidden rounded-lg border border-[#efefef] bg-[#fafafa]">
                    <img
                      src={src}
                      alt={getSpecialMailImageName(src, index)}
                      className="block h-auto w-full object-contain"
                      loading="lazy"
                    />
                  </figure>
                ))
              ) : (
                <p className="text-[14px] text-[#999]">
                  Изображения не найдены. Добавьте файлы в папку src/assets/mail
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4 text-[14px] leading-relaxed whitespace-pre-line text-[#333]">
              {body.split('\n').map((paragraph, index) =>
                paragraph === '' ? (
                  <br key={index} />
                ) : (
                  <p key={index}>{paragraph}</p>
                ),
              )}
            </div>
          )}
        </article>
      </div>
    </main>
  )
}

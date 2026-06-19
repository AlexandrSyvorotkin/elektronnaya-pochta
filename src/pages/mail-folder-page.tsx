import { useMemo } from 'react'

import { MailList } from '@/components/mail/mail-list'
import { getFolderById } from '@/components/mail/mock-data'
import { useMail } from '@/context/mail-context'

interface MailFolderPageProps {
  folderId: string
}

export function MailFolderPage({ folderId }: MailFolderPageProps) {
  const { getMailsByFolder } = useMail()
  const folder = getFolderById(folderId)
  const mails = useMemo(() => getMailsByFolder(folderId), [folderId, getMailsByFolder])

  if (!folder) {
    return (
      <main className="flex min-w-0 flex-1 items-center justify-center bg-white text-[#999]">
        Папка не найдена
      </main>
    )
  }

  return (
    <MailList
      title={folder.label}
      folderId={folderId}
      count={folder.count}
      mails={mails}
      emptyMessage={`В папке «${folder.label}» пока нет писем`}
    />
  )
}

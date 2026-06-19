import { Navigate, useParams } from 'react-router-dom'

import { MailDetail } from '@/components/mail/mail-detail'
import { getFolderById } from '@/components/mail/mock-data'
import { useMail } from '@/context/mail-context'

interface MailDetailPageProps {
  folderId: string
}

export function MailDetailPage({ folderId }: MailDetailPageProps) {
  const { mailId } = useParams<{ mailId: string }>()
  const { getMailById } = useMail()
  const mail = mailId ? getMailById(mailId) : undefined
  const folder = getFolderById(folderId)

  if (!mail || mail.folderId !== folderId) {
    return <Navigate to={folder?.path ?? '/inbox'} replace />
  }

  return <MailDetail mail={mail} />
}

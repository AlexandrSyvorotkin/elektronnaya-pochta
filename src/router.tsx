import { Navigate, Route, Routes } from 'react-router-dom'

import { MailLayout } from '@/components/mail/mail-layout'
import { sidebarFolders } from '@/components/mail/mock-data'
import { MailDetailPage } from '@/pages/mail-detail-page'
import { MailFolderPage } from '@/pages/mail-folder-page'
import { WashingMachinesPage } from '@/pages/washing-machines-page'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/mashinka" element={<WashingMachinesPage />} />
      <Route path="/" element={<MailLayout />}>
        <Route index element={<Navigate to="/inbox" replace />} />
        {sidebarFolders.flatMap((folder) => {
          const folderPath = folder.path.replace(/^\//, '')
          return [
            <Route
              key={`${folder.id}-mail`}
              path={`${folderPath}/:mailId`}
              element={<MailDetailPage folderId={folder.id} />}
            />,
            <Route
              key={folder.id}
              path={folderPath}
              element={<MailFolderPage folderId={folder.id} />}
            />,
          ]
        })}
      </Route>
    </Routes>
  )
}

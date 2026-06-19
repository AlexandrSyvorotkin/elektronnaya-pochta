import { Outlet } from 'react-router-dom'

import { MailSidebar } from './mail-sidebar'
import { CornerHoverPopover } from './corner-hover-popover'
import { TopNav } from './top-nav'

export function MailLayout() {
  return (
    <div className="flex h-svh flex-col overflow-hidden bg-white">
      <TopNav />
      <div className="flex min-h-0 flex-1">
        <MailSidebar />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <Outlet />
        </div>
      </div>
      <CornerHoverPopover />
    </div>
  )
}

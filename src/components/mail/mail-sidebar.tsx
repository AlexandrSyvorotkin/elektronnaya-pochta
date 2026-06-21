import {
  FileEdit,
  Gamepad2,
  GraduationCap,
  Inbox,
  Landmark,
  LayoutTemplate,
  Megaphone,
  Newspaper,
  PenLine,
  Plus,
  Receipt,
  Send,
  ShieldAlert,
  StickyNote,
  Trash2,
  User,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { ShootModeSettingsPopover } from '@/components/mail/shoot-mode-settings-popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

import { sidebarFolders } from './mock-data'

const iconMap = {
  inbox: Inbox,
  users: Users,
  megaphone: Megaphone,
  landmark: Landmark,
  newspaper: Newspaper,
  receipt: Receipt,
  'graduation-cap': GraduationCap,
  'gamepad-2': Gamepad2,
  user: User,
  'sticky-note': StickyNote,
  send: Send,
  'file-edit': FileEdit,
  'layout-template': LayoutTemplate,
  'shield-alert': ShieldAlert,
  'trash-2': Trash2,
} as const

export function MailSidebar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <aside className="flex h-full min-h-0 w-56 shrink-0 flex-col border-r border-[#e5e5e5] bg-[#fafafa]">
      <div className="p-3">
        <Button className="h-9 w-full rounded-lg bg-[#005ff9] text-[13px] font-medium text-white shadow-none hover:bg-[#0050d4]">
          <PenLine className="size-4" />
          Написать письмо
        </Button>
      </div>

      <ScrollArea className="min-h-0 flex-1 px-2">
        <ul className="space-y-0.5 pb-2">
          {sidebarFolders.map((folder) => {
            const Icon = iconMap[folder.icon]
            return (
              <li key={folder.id}>
                <NavLink
                  to={folder.path}
                  className={({ isActive }) =>
                    cn(
                      'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13px] transition-colors',
                      isActive
                        ? 'bg-[#edf4ff] font-medium text-[#005ff9]'
                        : 'text-[#333] hover:bg-[#f0f0f0]',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className="size-4 shrink-0 opacity-70" />
                      <span className="flex-1 truncate">{folder.label}</span>
                      {folder.count && (
                        <span
                          className={cn(
                            'text-[12px] tabular-nums',
                            isActive ? 'text-[#005ff9]' : 'text-[#999]',
                          )}
                        >
                          {folder.count}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] text-[#005ff9] hover:bg-[#f0f0f0]"
        >
          <Plus className="size-4" />
          Новая папка
        </button>
      </ScrollArea>

      <Separator className="bg-[#e5e5e5]" />

      <div className="p-3">
        <ShootModeSettingsPopover
          open={menuOpen}
          onOpenChange={setMenuOpen}
          currentMode="mail"
          side="top"
          align="start"
          triggerClassName="w-full"
        />
      </div>
    </aside>
  )
}

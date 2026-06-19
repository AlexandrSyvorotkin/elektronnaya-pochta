import {
  ChevronDown,
  Gift,
  Search,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { topNavItems } from './mock-data'

export function TopNav() {
  return (
    <header className="flex h-12 shrink-0 items-center gap-4 border-b border-[#e5e5e5] bg-white px-4">
      <nav className="flex items-center gap-0.5 overflow-hidden">
        {topNavItems.map((item, index) => (
          <Button
            key={item}
            variant="ghost"
            size="sm"
            className={`h-8 rounded-md px-2.5 text-[13px] font-normal hover:bg-[#f0f0f0] ${
              index === 1
                ? 'bg-[#edf4ff] font-medium text-[#005ff9] hover:bg-[#edf4ff]'
                : 'text-[#333]'
            }`}
          >
            {item}
            {index === 1 && (
              <span className="ml-1 rounded bg-[#ff3347] px-1.5 py-0 text-[10px] font-semibold text-white">
                999+
              </span>
            )}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-0.5 px-2 text-[13px] font-normal text-[#333] hover:bg-[#f0f0f0]"
        >
          Все проекты
          <ChevronDown className="size-3.5 opacity-60" />
        </Button>
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative w-72">
          <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-[#999]" />
          <Input
            placeholder="Поиск по почте"
            className="h-8 rounded-lg border-[#e0e0e0] bg-[#f5f5f5] pl-9 text-[13px] shadow-none placeholder:text-[#999] focus-visible:border-[#005ff9] focus-visible:ring-[#005ff9]/20"
          />
        </div>

        <Button
          variant="ghost"
          size="icon-sm"
          className="size-8 rounded-full bg-[#fff3e0] text-[#ff9800] hover:bg-[#ffe0b2]"
        >
          <Gift className="size-4" />
        </Button>
      </div>
    </header>
  )
}

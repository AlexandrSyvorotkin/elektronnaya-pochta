import { Mail, Settings, WashingMachine } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useShootSettings } from '@/context/shoot-settings-context'
import { cn } from '@/lib/utils'

export type ShootModeId = 'mail' | 'mashinka'

export const SHOOT_MODE_OPTIONS = [
  {
    id: 'mail' as const,
    label: 'Почта',
    description: 'Спец. письма и таймеры',
    icon: Mail,
  },
  {
    id: 'mashinka' as const,
    label: 'Машинка',
    description: 'Продажа стиральных машин',
    icon: WashingMachine,
  },
]

interface ShootModeSettingsPopoverProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentMode: ShootModeId
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  triggerClassName?: string
  contentClassName?: string
}

export function ShootModeSettingsPopover({
  open,
  onOpenChange,
  currentMode,
  side = 'top',
  align = 'start',
  triggerClassName,
  contentClassName,
}: ShootModeSettingsPopoverProps) {
  const navigate = useNavigate()
  const { openSettings } = useShootSettings()

  const handleOptionClick = (optionId: ShootModeId) => {
    onOpenChange(false)

    if (optionId === 'mail') {
      if (currentMode === 'mail') {
        openSettings()
        return
      }

      navigate('/inbox')
      return
    }

    if (currentMode !== 'mashinka') {
      navigate('/mashinka')
    }
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] text-[#666] hover:bg-[#f0f0f0]',
            triggerClassName,
          )}
        >
          <Settings className="size-4" />
          Настройки
        </button>
      </PopoverTrigger>

      <PopoverContent
        side={side}
        align={align}
        sideOffset={8}
        className={cn('w-64 border-[#e5e5e5] p-2 shadow-lg', contentClassName)}
      >
        <PopoverHeader className="px-1 pb-1">
          <PopoverTitle className="text-[13px] text-[#333]">Настройки съёмки</PopoverTitle>
          <PopoverDescription className="text-[12px] text-[#888]">
            Выберите реквизит
          </PopoverDescription>
        </PopoverHeader>

        <div className="flex flex-col gap-1">
          {SHOOT_MODE_OPTIONS.map((option) => {
            const Icon = option.icon

            return (
              <button
                key={option.id}
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition-colors hover:bg-[#f0f0f0]"
                onClick={() => handleOptionClick(option.id)}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#edf4ff] text-[#005ff9]">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-medium text-[#333]">{option.label}</span>
                  <span className="block text-[11px] text-[#888]">{option.description}</span>
                </span>
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

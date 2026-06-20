import { useCallback, useEffect, useRef, useState } from 'react'

import { ShootModeSettingsPopover } from '@/components/mail/shoot-mode-settings-popover'
import { cn } from '@/lib/utils'

const HIDE_DELAY_MS = 150

export function CornerShootModeSettings() {
  const [cornerHover, setCornerHover] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current)
      hideTimerRef.current = null
    }
  }, [])

  const handleZoneEnter = () => {
    clearHideTimer()
    setCornerHover(true)
  }

  const handleZoneLeave = () => {
    clearHideTimer()

    hideTimerRef.current = setTimeout(() => {
      if (menuOpen) return
      setCornerHover(false)
    }, HIDE_DELAY_MS)
  }

  useEffect(() => {
    return () => clearHideTimer()
  }, [clearHideTimer])

  const showSettings = cornerHover || menuOpen

  return (
    <>
      {!menuOpen && (
        <div
          aria-hidden
          className="fixed bottom-0 left-0 z-50 size-20"
          onMouseEnter={handleZoneEnter}
          onMouseLeave={handleZoneLeave}
        />
      )}

      <div
        className="fixed bottom-0 left-0 z-50 p-3"
        onMouseEnter={handleZoneEnter}
        onMouseLeave={handleZoneLeave}
      >
        <div
          className={cn(
            'rounded-lg border border-[#e5e5e5] bg-[#fafafa] shadow-sm transition-all duration-200',
            showSettings
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-1 opacity-0',
          )}
        >
          <ShootModeSettingsPopover
            open={menuOpen}
            onOpenChange={setMenuOpen}
            currentMode="mashinka"
            side="top"
            align="start"
            triggerClassName="w-full bg-transparent"
          />
        </div>
      </div>
    </>
  )
}

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

interface ShootSettingsContextValue {
  isOpen: boolean
  openSettings: () => void
  closeSettings: () => void
  toggleSettings: () => void
}

const ShootSettingsContext = createContext<ShootSettingsContextValue | null>(null)

export function ShootSettingsProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openSettings = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeSettings = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggleSettings = useCallback(() => {
    setIsOpen((current) => !current)
  }, [])

  const value = useMemo(
    () => ({
      isOpen,
      openSettings,
      closeSettings,
      toggleSettings,
    }),
    [isOpen, openSettings, closeSettings, toggleSettings],
  )

  return (
    <ShootSettingsContext.Provider value={value}>{children}</ShootSettingsContext.Provider>
  )
}

export function useShootSettings() {
  const context = useContext(ShootSettingsContext)

  if (!context) {
    throw new Error('useShootSettings must be used within ShootSettingsProvider')
  }

  return context
}

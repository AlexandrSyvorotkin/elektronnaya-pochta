import { BrowserRouter } from 'react-router-dom'

import { TooltipProvider } from '@/components/ui/tooltip'
import { MailProvider } from '@/context/mail-context'
import { ShootSettingsProvider } from '@/context/shoot-settings-context'
import { AppRouter } from '@/router'

function App() {
  return (
    <BrowserRouter>
      <MailProvider>
        <ShootSettingsProvider>
          <TooltipProvider>
            <AppRouter />
          </TooltipProvider>
        </ShootSettingsProvider>
      </MailProvider>
    </BrowserRouter>
  )
}

export default App

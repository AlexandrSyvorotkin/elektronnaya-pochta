import { BrowserRouter } from 'react-router-dom'

import { TooltipProvider } from '@/components/ui/tooltip'
import { MailProvider } from '@/context/mail-context'
import { AppRouter } from '@/router'

function App() {
  return (
    <BrowserRouter>
      <MailProvider>
        <TooltipProvider>
          <AppRouter />
        </TooltipProvider>
      </MailProvider>
    </BrowserRouter>
  )
}

export default App

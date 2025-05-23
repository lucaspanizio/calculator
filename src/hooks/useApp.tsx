import { useContext } from 'react'

import { AppContext, AppContextProps } from '@/store/app-provider'

export const useApp = (): AppContextProps => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useApp must be used within a AppProvider')
  }

  return context
}

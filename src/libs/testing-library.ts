import { AppProvider } from '@/store/app-provider'
import { render, RenderOptions, waitFor, screen, fireEvent } from '@testing-library/react'
import { ReactElement } from 'react'

export function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    wrapper: AppProvider,
    ...options,
  })
}

export { customRender as render, screen, waitFor, fireEvent }

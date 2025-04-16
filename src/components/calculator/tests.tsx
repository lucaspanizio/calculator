import { Calculator } from '@/components/calculator'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, waitFor, screen } from '@/libs/testing-library'

describe('Calculator', () => {
  let rerender: ReturnType<typeof render>['rerender']

  beforeEach(() => {
    const renderResult = render(<Calculator />)
    rerender = renderResult.rerender
  })

  describe('Display', () => {
    it('should be rendered', () => {
      expect(screen.getByTestId('display')).toBeInTheDocument()
    })
  })

  describe('Keyboard', () => {
    it('should be rendered', () => {
      expect(screen.getByTestId('keyboard')).toBeInTheDocument()
    })
  })

  describe('History button', () => {
    it('should be rendered', () => {
      expect(screen.getByTestId('history-button')).toBeInTheDocument()
    })

    it('should toggle the history panel when clicked', async () => {
      const button = screen.getByTestId('history-button')
      const panel = screen.getByTestId('history-panel')

      button.click()
      expect(panel).toBeInTheDocument()
      await waitFor(() => expect(window.getComputedStyle(panel).height).toBe('88%'))

      button.click()
      await waitFor(() => expect(window.getComputedStyle(panel).height).toBe('0px'))
    })
  })

  describe('History panel', () => {
    it('should be rendered', () => {
      expect(screen.getByTestId('history-panel')).toBeInTheDocument()
    })
  })

  describe('Overlay', () => {
    it('should be rendered when the history panel is open', async () => {
      const button = screen.getByTestId('history-button')

      button.click()

      expect(await screen.findByTestId('overlay')).toBeInTheDocument()

      button.click()

      rerender(<Calculator />)

      await waitFor(() => expect(screen.queryByTestId('overlay')).not.toBeInTheDocument())
    })
  })
})

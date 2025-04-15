import { Calculator } from '@/components/calculator'
import { describe, it, expect } from 'vitest'
import { render, waitFor } from '@/libs/testing-library'

describe('Calculator', () => {
  describe('Display', () => {
    it('should be rendered', () => {
      const { getByTestId } = render(<Calculator />)
      expect(getByTestId('display')).toBeInTheDocument()
    })
  })

  describe('Keyboard', () => {
    it('should be rendered', () => {
      const { getByTestId } = render(<Calculator />)
      expect(getByTestId('keyboard')).toBeInTheDocument()
    })
  })

  describe('History button', () => {
    it('should be rendered', () => {
      const { getByTestId } = render(<Calculator />)
      expect(getByTestId('history-button')).toBeInTheDocument()
    })

    it('should toggle the history panel when clicked', async () => {
      const { getByTestId } = render(<Calculator />)
      const button = getByTestId('history-button')
      const panel = getByTestId('history-panel')

      button.click()
      expect(panel).toBeInTheDocument()
      await waitFor(() => expect(window.getComputedStyle(panel).height).toBe('88%'))

      button.click()
      await waitFor(() => expect(window.getComputedStyle(panel).height).toBe('0px'))
    })
  })

  describe('History panel', () => {
    it('should be rendered', () => {
      const { getByTestId } = render(<Calculator />)
      expect(getByTestId('history-panel')).toBeInTheDocument()
    })
  })

  describe('Overlay', () => {
    it('should be rendered', () => {
      const { getByTestId } = render(<Calculator />)
      expect(getByTestId('history-button')).toBeInTheDocument()
    })

    it('should render overlay when panel is open and remove it when closed', async () => {
      const { getByTestId, findByTestId, queryByTestId, rerender } = render(<Calculator />)

      const button = getByTestId('history-button')

      button.click()

      expect(await findByTestId('overlay')).toBeInTheDocument()

      button.click()

      rerender(<Calculator />)

      await waitFor(() => expect(queryByTestId('overlay')).not.toBeInTheDocument())
    })
  })
})

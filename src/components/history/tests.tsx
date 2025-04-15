import { vi, describe, it, expect } from 'vitest'
import { render } from '@/libs/testing-library'
import { Calculator } from '@/components/calculator'
import { useApp } from '@/hooks/useApp'

vi.mock('@/hooks/useApp', () => ({
  useApp: vi.fn(),
}))

describe('History panel', () => {
  it('should display a message if no calc was performed', () => {
    ;(useApp as ReturnType<typeof vi.fn>).mockReturnValue({
      historyIsOpen: true,
      historyMaths: [],
    })

    const { getByText } = render(<Calculator />)

    expect(getByText('Ainda não há histórico')).toBeInTheDocument()
  })

  it('should display a list of calcs performed', () => {
    const calculations = ['2+5=7', '7-3=4', '4*10=40', '40/2=20']

    ;(useApp as ReturnType<typeof vi.fn>).mockReturnValue({
      historyIsOpen: true,
      historyMaths: calculations,
    })

    const { getByText } = render(<Calculator />)

    calculations.forEach((calc) => {
      expect(getByText(calc)).toBeInTheDocument()
    })
  })

  it('should be hidden and rewrite the calc in the input when any item is clicked', () => {
    const hookMock = {
      display: '',
      historyIsOpen: true,
      historyMaths: ['2+5=7'],

      handleHistoryMathClick: vi.fn(() => {
        const historyMath = hookMock.historyMaths[0]!
        hookMock.historyIsOpen = false
        hookMock.display = historyMath.slice(0, historyMath.indexOf('='))
      }),
    }

    ;(useApp as ReturnType<typeof vi.fn>).mockReturnValue(hookMock)

    const { getByTestId, rerender } = render(<Calculator />)

    const historyItem = getByTestId('history-item')

    historyItem.click()
    expect(hookMock.handleHistoryMathClick).toHaveBeenCalledOnce()

    rerender(<Calculator />)

    const heightOfTheHistoryPanel = window.getComputedStyle(getByTestId('history-panel')).height
    expect(heightOfTheHistoryPanel).toBe('0px')

    const input = getByTestId('display')
    expect(input).toHaveValue(hookMock.display)
    expect(input).toHaveFocus()
  })
})

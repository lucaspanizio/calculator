import { describe, it, expect, beforeEach } from 'vitest'
import { render, fireEvent, screen } from '@/libs/testing-library'
import { Calculator } from '@/components/calculator'

function clearInput(input: HTMLElement) {
  fireEvent.keyDown(input, { key: 'ce' })
}

function pressKey(input: HTMLElement, key: string) {
  fireEvent.keyDown(input, { key })
}

function pressKeySequence(input: HTMLElement, keys: string[]) {
  keys.forEach((key) => pressKey(input, key))
}

describe('Display', () => {
  let input: HTMLInputElement

  beforeEach(() => {
    render(<Calculator />)
    input = screen.getByTestId('display')
    clearInput(input)
  })

  it('should be started with focus and the zero character', () => {
    expect(input).toHaveFocus()
    expect(input).toHaveValue('0')
  })

  it('should replace the initial character if the new one is a number', () => {
    pressKey(input, '5')
    expect(input).toHaveValue('5')

    clearInput(input)

    pressKey(input, '/')
    expect(input).toHaveValue('0/')
  })

  describe('when typing is sequential', () => {
    it('should ignore invalid keys', () => {
      const invalidKeys = ['a', 'b', 'x', '@', '!', '?', ' ']

      pressKeySequence(input, invalidKeys)

      expect(input).toHaveValue('0')
    })

    it('should ignore other points in the same number', () => {
      const cases = [
        { seq: ['.'], expected: '0.' },
        { seq: ['.', '.'], expected: '0.' },
        { seq: ['5', '.'], expected: '5.' },
        { seq: ['5', '.', '.'], expected: '5.' },
        { seq: ['5', '.', '0'], expected: '5.0' },
        { seq: ['5', '.', '0', '.'], expected: '5.0' },
        { seq: ['5', '.', '.', '0'], expected: '5.0' },
      ]

      cases.forEach(({ seq, expected }) => {
        pressKeySequence(input, seq)
        expect(input).toHaveValue(expected)
        clearInput(input)
      })
    })

    it('should prevent two operators in a row', () => {
      const cases = [
        { seq: ['+'], expected: '0+' },
        { seq: ['-', '-'], expected: '0-' },
        { seq: ['5', '*', '*'], expected: '5*' },
        { seq: ['5', '/', '/', '5'], expected: '5/5' },
      ]

      cases.forEach(({ seq, expected }) => {
        pressKeySequence(input, seq)
        expect(input).toHaveValue(expected)
        clearInput(input)
      })
    })

    it('should replace the operator if is the last character', () => {
      const cases = [
        { seq: ['+', '-'], expected: '0-' },
        { seq: ['5', '+', '*'], expected: '5*' },
        { seq: ['5', '/', '-', '*', '+'], expected: '5+' },
        { seq: ['5', '/', '5', '*', '+'], expected: '5/5+' },
      ]

      cases.forEach(({ seq, expected }) => {
        pressKeySequence(input, seq)
        expect(input).toHaveValue(expected)
        clearInput(input)
      })
    })
  })

  describe('when the cursor is repositioned', () => {
    it('should ignore invalid keys', () => {
      pressKeySequence(input, ['5', '3', '5'])

      // Move o cursor entre o '5' e o '3'
      input.setSelectionRange(1, 1)

      pressKey(input, 'a')
      expect(input).toHaveValue('535')
    })

    it('should ignore other points in the same number', () => {
      pressKeySequence(input, ['5', '.', '0'])

      // Move o cursor entre o '5' e o '.'
      input.setSelectionRange(1, 1)

      pressKey(input, '.')
      expect(input).toHaveValue('5.0')
    })

    it('should prevent two operators in a row', () => {
      pressKeySequence(input, ['5', '*', '5'])

      input.setSelectionRange(1, 1) // entre '5' e '*'
      fireEvent.keyDown(input, { key: '/' })

      expect(input).toHaveValue('5*5')
    })

    it('should replace the operator if is the last character', () => {
      pressKeySequence(input, ['5', '+', '5'])

      input.setSelectionRange(1, 1) // entre o '5' e o '+'

      pressKey(input, '*')
      expect(input).toHaveValue('5+5')
    })
  })
})

import { KeyboardEvent } from 'react'

import { useApp } from '@/hooks/useApp'

import { Input } from './styles'

// prettier-ignore
export const allowedKeys = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '-', '+', '/', '*', '%', '=', 'c', 'ce', '(', ')',
  '.', 'enter', 'backspace', 'delete'
]

const navigationKeys = ['home', 'end', 'arrowleft', 'arrowright']

export const Display = () => {
  const { error, display, handleKey, inputDisplayRef } = useApp()

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key.toLowerCase()

    if (!allowedKeys.includes(key)) return
    if (navigationKeys.includes(key)) return

    event.preventDefault()
    handleKey(key)
  }

  return (
    <Input
      autoFocus
      hasError={!!error}
      ref={inputDisplayRef}
      value={error || display}
      onKeyDown={handleKeyDown}
      onChange={() => {}}
      data-testid="display"
    />
  )
}

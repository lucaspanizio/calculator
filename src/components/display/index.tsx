import { KeyboardEvent } from 'react'

import { useApp } from '@/hooks/useApp'

import { Input } from './styles'

// prettier-ignore
export const allowedKeys = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '-', '+', '/', '*', '%', '=', 'c', 'ce', '(', ')',
  'enter', 'backspace', 'home', 'end'
]

export const Display = () => {
  const { error, display, validateKey, inputDisplayRef } = useApp()

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const key = event.key.toLowerCase()
    if (!allowedKeys.includes(key)) return
    validateKey(key)
  }

  return (
    <Input
      autoFocus
      hasError={!!error}
      ref={inputDisplayRef}
      value={error || display}
      onKeyUp={handleKeyUp}
      data-testid="display"
    />
  )
}

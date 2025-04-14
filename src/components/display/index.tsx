import { KeyboardEvent } from 'react'

import { useApp } from '@/hooks/useApp'

import { allowedKeys } from './settings'
import { Input } from './styles'

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
      onChange={() => {}}
    />
  )
}

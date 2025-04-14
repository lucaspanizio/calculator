import { MouseEvent } from 'react'

import { useApp } from '@/hooks/useApp'

import { keys } from './settings'
import { Container, Button, Row } from './styles'

export const Keyboard = () => {
  const { validateKey, inputDisplayRef } = useApp()

  const handleClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, label: string) => {
    event.preventDefault()
    inputDisplayRef?.current?.focus()
    validateKey(label.toLowerCase())
  }

  return (
    <Container>
      {keys.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((item, buttonIndex) => (
            <Button key={buttonIndex} type={item.type} onClick={(event) => handleClick(event, item.label)}>
              {item.icon ? <span className="material-symbols-outlined">{item.icon}</span> : <span>{item.label}</span>}
            </Button>
          ))}
        </Row>
      ))}
    </Container>
  )
}

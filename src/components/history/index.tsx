import { useApp } from '@/hooks/useApp'

import { Container, List, ListItem, Span } from './styles'

export const History = () => {
  const { historyIsOpen, historyMaths, handleHistoryMathClick } = useApp()

  const showHistoryMaths = () => {
    if (historyMaths.length > 0) {
      return (
        <List>
          {historyMaths.map((math, index) => {
            return (
              <ListItem key={index} onClick={handleHistoryMathClick}>
                {math}
              </ListItem>
            )
          })}
        </List>
      )
    }
    return <Span>Ainda não há histórico</Span>
  }

  return <Container isOpen={historyIsOpen}>{showHistoryMaths()}</Container>
}

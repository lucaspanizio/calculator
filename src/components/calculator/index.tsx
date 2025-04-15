import historyIcon from '@/assets/historyIcon.png'
import { useApp } from '@/hooks/useApp'

import { Display } from '../display'
import { Keyboard } from '../keyboard'
import { HistoryPanel } from '../history'
import { Container, Overlay, HistoryButton } from './styles'

export const Calculator = () => {
  const { historyIsOpen, handleHistoryClick, divCalculatorRef } = useApp()

  return (
    <Container ref={divCalculatorRef}>
      <HistoryButton historyIsOpen={historyIsOpen} onClick={handleHistoryClick} data-testid="history-button">
        <img src={historyIcon} />
      </HistoryButton>

      <Display />
      <Keyboard />
      <HistoryPanel />

      {historyIsOpen && <Overlay data-testid="overlay" />}
    </Container>
  )
}

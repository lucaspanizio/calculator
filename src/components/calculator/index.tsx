import historyIcon from '@/assets/historyIconW.png'
import { useApp } from '@/hooks/useApp'

import { Display } from '../display'
import { History } from '../history'
import { Keyboard } from '../keyboard'
import { Container, Overlay, HistoryButton } from './styles'

export const Calculator = () => {
  const { historyIsOpen, handleHistoryClick, divCalculatorRef } = useApp()

  return (
    <Container ref={divCalculatorRef}>
      <HistoryButton historyIsOpen={historyIsOpen} onClick={handleHistoryClick}>
        <img src={historyIcon} />
      </HistoryButton>

      <Display />
      <Keyboard />
      <History />

      {historyIsOpen && <Overlay />}
    </Container>
  )
}

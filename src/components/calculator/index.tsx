import { History } from '../History';
import { Display } from '../Display';
import { Keyboard } from '../Keyboard';
import { Container, Overlay, HistoryButton } from './styles';
import { useApp } from '@/hooks/useApp';
import historyIcon from '@/assets/historyIconW.png';

export const Calculator = () => {
  const { historyIsOpen, handleHistoryClick, divCalculatorRef } = useApp();

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
  );
};

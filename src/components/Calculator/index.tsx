import React from "react";
import { History } from "../History";
import { Display } from "../Display";
import { Keyboard } from "../Keyboard";
import { Container, Overlay, HistoryButton } from "./styles";
import { useApp } from "../../store/hooks/useApp";
import historyIcon from "../../assets/historyIconW.png";

export const Calculator: React.FC = () => {
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

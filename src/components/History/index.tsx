import React from "react";
import { Container, List, ListItem, Span } from "./styles";
import { useApp } from "../../store/hooks/useApp";

export const History: React.FC = () => {
  const { historyIsOpen, historyMaths, handleHistoryMathClick } = useApp();

  const showHistoryMaths = () => {
    if (historyMaths.length > 0) {
      return (
        <List>
          {historyMaths.map((math, index) => {
            return (
              <ListItem key={index} onClick={handleHistoryMathClick}>
                {math}
              </ListItem>
            );
          })}
        </List>
      );
    }
    return <Span>Ainda não há histórico</Span>;
  };

  return <Container isOpen={historyIsOpen}>{showHistoryMaths()}</Container>;
};

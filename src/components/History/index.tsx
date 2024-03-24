import React from "react";
import { Container } from "./styles";
import { useApp } from "../../store/hooks/useApp";

export const History: React.FC = () => {
  const { historyIsOpen } = useApp();
  return <Container isOpen={historyIsOpen} />;
};

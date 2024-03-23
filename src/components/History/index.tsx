import React from "react";
import { Container } from "./styles";

interface IHistoryProps {
  isOpen: boolean;
}

export const History: React.FC<IHistoryProps> = ({ isOpen }) => (
  <Container isOpen={isOpen} />
);

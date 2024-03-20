import React, { MouseEvent, RefObject } from "react";
import { Container, Button, Row } from "./styles";
import { keys } from "./settings";

interface IKeyboardProps {
  inputRef: RefObject<HTMLInputElement>;
  onClick: (key: string) => void;
}

export const Keyboard: React.FC<IKeyboardProps> = ({ onClick, inputRef }) => {
  const handleClick = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    label: string
  ) => {
    event.preventDefault();
    inputRef?.current?.focus();
    onClick(label.toLowerCase());
  };

  return (
    <Container>
      {keys.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((item, buttonIndex) => (
            <Button
              key={buttonIndex}
              type={item.type}
              onClick={(event) => handleClick(event, item.label)}
            >
              {item.icon ? (
                <span className="material-symbols-outlined">{item.icon}</span>
              ) : (
                <span>{item.label}</span>
              )}
            </Button>
          ))}
        </Row>
      ))}
    </Container>
  );
};

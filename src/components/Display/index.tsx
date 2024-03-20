import React, { KeyboardEvent, RefObject } from "react";
import { Input } from "./styles";
import { allowedKeys } from "./settings";

interface IDisplayProps {
  value: string;
  inputRef: RefObject<HTMLInputElement>;
  onKeyUp: (value: string) => void;
}

export const Display: React.FC<IDisplayProps> = ({
  value,
  inputRef,
  onKeyUp,
}) => {
  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const key = event.key.toLowerCase();
    if (!allowedKeys.includes(key)) return;
    onKeyUp(key);
  };

  return (
    <Input
      autoFocus
      ref={inputRef}
      value={value}
      onKeyUp={handleKeyUp}
      onChange={() => {}}
    />
  );
};

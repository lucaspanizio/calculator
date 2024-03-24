import React, { KeyboardEvent } from "react";
import { Input } from "./styles";
import { allowedKeys } from "./settings";
import { useApp } from "../../store/hooks/useApp";

export const Display: React.FC = () => {
  const { display, validateKey, inputDisplayRef } = useApp();

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const key = event.key.toLowerCase();
    if (!allowedKeys.includes(key)) return;
    validateKey(key);
  };

  return (
    <Input
      autoFocus
      ref={inputDisplayRef}
      value={display}
      onKeyUp={handleKeyUp}
      onChange={() => {}}
    />
  );
};

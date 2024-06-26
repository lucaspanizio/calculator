import React, { KeyboardEvent } from "react";
import { allowedKeys } from "./settings";
import { Input } from "./styles";
import { useApp } from "@/store/hooks/useApp";

export const Display: React.FC = () => {
  const { error, display, validateKey, inputDisplayRef } = useApp();

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const key = event.key.toLowerCase();
    if (!allowedKeys.includes(key)) return;
    validateKey(key);
  };

  return (
    <Input
      autoFocus
      hasError={!!error}
      ref={inputDisplayRef}
      value={error || display}
      onKeyUp={handleKeyUp}
      onChange={() => {}}
    />
  );
};

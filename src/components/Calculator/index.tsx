import React, { useRef, useState } from "react";
import { Display } from "../Display";
import { Keyboard } from "../Keyboard";
import { Container, ErrorLabel } from "./styles";

export const Calculator: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [error, setError] = useState<string>("");

  const calculate = (expression: string) => {
    try {
      console.log(expression);
      const result = eval(expression);
      if (isNaN(result)) {
        setError("Resultado não numérico");
        setDisplayValue("0");
      } else {
        setDisplayValue(result.toString());
      }
    } catch (error) {
      setError("Expressão inválida");
      setDisplayValue("0");
    }
  };

  const validateKey = (newKey: string) => {
    setError("");

    const numberKeysRegex = /[0-9]/;
    const operatorKeysRegex = /[+\-*/]/g;

    const lastKey = displayValue.slice(-1);
    const lastKeyIsOperator = operatorKeysRegex.test(lastKey);
    const newKeyIsOperador = operatorKeysRegex.test(newKey);

    // Não permite que a primeira tecla seja um operador
    if (operatorKeysRegex.test(newKey) && displayValue.length === 0) return;

    // Não permite dois pontos seguidos
    if (lastKey === "." && newKey === ".") return;

    // Não permite dois operadores seguidos, o último toma o lugar do primeiro
    if (lastKeyIsOperator && newKeyIsOperador) {
      setDisplayValue(`${displayValue.slice(0, -1)}${newKey}`);
      return;
    }

    // Se o display está limpo (contém somente um zero) e digitar
    // ou teclar um número, esse número toma o lugar do zero
    if (
      numberKeysRegex.test(newKey) &&
      displayValue.length === 1 &&
      displayValue === "0"
    ) {
      setDisplayValue(newKey);
      return;
    }

    switch (newKey) {
      case "=":
      case "enter":
        if (!lastKeyIsOperator) calculate(displayValue);
        break;
      case "c":
      case "ce":
        setDisplayValue("0");
        break;
      case "<":
      case "backspace":
        setDisplayValue(displayValue.slice(0, -1));
        break;
      case "%":
        {
          const numbers = displayValue.match(/(\d+(\.\d+)?)/g) || [];
          const operators = displayValue.match(operatorKeysRegex) || [];

          // Reescreve a expressão
          const lastOperator = operators[operators.length - 1];
          const lastOperatorIndex = displayValue.lastIndexOf(lastOperator);

          const percentNumber = numbers[numbers.length - 1];
          const lastNumber = numbers[numbers.length - 2];

          const previousExpression = `${displayValue.substring(
            0,
            lastOperatorIndex + 1
          )}`;
          const percentExpression = `(${lastNumber}*(${percentNumber}/100))`;

          const newExpression = `${previousExpression}${percentExpression}`;

          calculate(newExpression);
          return;
        }
        break;
      default:
        setDisplayValue(`${displayValue}${newKey}`);
    }
  };

  return (
    <Container>
      <Display value={displayValue} onKeyUp={validateKey} inputRef={inputRef} />
      {error && <ErrorLabel>{error}</ErrorLabel>}
      <Keyboard onClick={validateKey} inputRef={inputRef} />
    </Container>
  );
};
import { RefObject, PropsWithChildren, createContext, useEffect, useRef, useState } from 'react'

const OPERATOR_REGEX = /[+\-*/]/

export interface AppContextProps {
  error: string
  display: string
  historyIsOpen: boolean
  historyMaths: string[]
  handleKey: (key: string) => void
  handleHistoryClick: () => void
  handleHistoryMathClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
  divCalculatorRef: RefObject<HTMLDivElement>
  inputDisplayRef: RefObject<HTMLInputElement>
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export const AppContext = createContext({} as AppContextProps)

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const inputDisplayRef = useRef<HTMLInputElement>(null)
  const divCalculatorRef = useRef<HTMLDivElement>(null)

  const [historyIsOpen, setHistoryIsOpen] = useState(false)
  const [historyMaths, setHistoryMaths] = useState<string[]>([])

  const [error, setError] = useState<string>('')
  const [display, setDisplay] = useState<string>('0')

  const calculate = (expression: string) => {
    try {
      const result = eval(expression)
      if (isNaN(result)) {
        setError('Resultado não numérico')
        setDisplay('0')
      } else {
        const historyMath = `${expression}=${result.toString()}`
        setHistoryMaths((prev) => [...prev, historyMath])
        setDisplay(result.toString())
      }
    } catch (error) {
      setError('Expressão inválida')
      setDisplay('0')
    }
  }

  const updateDisplayOnDelete = (direction: 'forward' | 'backward') => {
    const input = inputDisplayRef.current
    if (!input) return

    const start = input.selectionStart ?? display.length
    const end = input.selectionEnd ?? display.length

    if (start !== end) {
      setDisplay(display.slice(0, start) + display.slice(end))
      setTimeout(() => input.setSelectionRange(start, start), 0)
    } else {
      const newStart = direction === 'backward' ? Math.max(start - 1, 0) : start
      const newEnd = direction === 'forward' ? start + 1 : start
      setDisplay(display.slice(0, newStart) + display.slice(newEnd))
      setTimeout(() => input.setSelectionRange(newStart, newStart), 0)
    }
  }

  const preventMultipleDots = (newKey: string, startCursor: number, endCursor: number) => {
    if (newKey === '.') {
      const numberAroundCursor =
        display
          .slice(0, startCursor)
          .split(/[^0-9.]/)
          .pop() + display.slice(endCursor).split(/[^0-9.]/)[0]
      if (numberAroundCursor.includes('.')) return false
    }
    return true
  }

  const handleOperatorKey = (newKey: string, startCursor: number, endCursor: number, input: HTMLInputElement) => {
    // Impede que operadores inválidos (exceto '+' ou '-') sejam inseridos no início
    if (startCursor === 0 && !/^[+-]$/.test(newKey)) return false

    // Verifica se há uma seleção de texto e se ela contém algum operador
    // Se sim, substitui o conteúdo selecionado pelo novo operador
    if (startCursor !== endCursor && OPERATOR_REGEX.test(display.slice(startCursor, endCursor))) {
      setDisplay((prevDisplay) => prevDisplay.slice(0, startCursor) + newKey + prevDisplay.slice(endCursor))

      // Atualiza o cursor para ficar logo após o operador inserido
      setTimeout(() => input.setSelectionRange(startCursor + 1, startCursor + 1), 0)
      return false
    }

    const cursorIsAtEnd = startCursor === display.length && endCursor === display.length
    const prevKeyIsOperator = OPERATOR_REGEX.test(display[startCursor - 1] ?? '')
    const nextKeyIsOperator = OPERATOR_REGEX.test(display[startCursor] ?? '')

    // Se o cursor está no final e o caractere anterior é um operador, substitui ele pelo novo operador
    if (cursorIsAtEnd && prevKeyIsOperator) {
      setDisplay((prevDisplay) => prevDisplay.slice(0, prevDisplay.length - 1) + newKey)

      // Reposiciona o cursor no final
      setTimeout(() => input.setSelectionRange(display.length, display.length), 0)
      return false
    }

    // Impede que o novo operador seja inserido caso haja um operador antes ou depois da posição atual do cursor
    if (prevKeyIsOperator || nextKeyIsOperator) return false

    return true
  }

  const handleSpecialKeys = (newKey: string, startCursor: number, endCursor: number, input: HTMLInputElement) => {
    switch (newKey) {
      case '=':
      case 'enter':
        if (!/[+\-*/]/.test(display[startCursor - 1] ?? '')) calculate(display)
        return false

      case 'c':
        setDisplay('0')
        return false

      case 'ce':
        setDisplay('0')
        setHistoryMaths([])
        return false

      case 'delete':
        updateDisplayOnDelete('forward')
        return false

      case '<':
      case 'backspace':
        updateDisplayOnDelete('backward')
        return false

      case '%': {
        const numbers = display.match(/(\d+(\.\d+)?)/g) || []
        const operators = display.match(/[+\-*/]/g) || []

        const lastOperator = operators.at(-1)
        const lastOperatorIndex = display.lastIndexOf(lastOperator ?? '')

        const percentNumber = numbers.at(-1)
        const lastNumber = numbers.at(-2)

        if (!lastOperator || !lastNumber || !percentNumber) return false

        const newExpr = `${display.slice(0, lastOperatorIndex + 1)}(${lastNumber}*(${percentNumber}/100))`
        calculate(newExpr)
        return false
      }

      default: {
        const cursor = startCursor + newKey.length
        setDisplay((prevDisplay) => prevDisplay.slice(0, startCursor) + newKey + prevDisplay.slice(endCursor))
        setTimeout(() => input.setSelectionRange(cursor, cursor), 0)
        return false
      }
    }
  }

  const handleKey = (newKey: string) => {
    const input = inputDisplayRef.current
    if (!input) return

    const startCursor = input.selectionStart ?? display.length
    const endCursor = input.selectionEnd ?? display.length

    if (OPERATOR_REGEX.test(newKey)) {
      if (!handleOperatorKey(newKey, startCursor, endCursor, input)) return
    }

    if (!preventMultipleDots(newKey, startCursor, endCursor)) return

    // Substitui o zero inicial por outro número
    if (/^[0-9]$/.test(newKey) && display === '0') return setDisplay(newKey)

    if (!handleSpecialKeys(newKey, startCursor, endCursor, input)) return
  }

  const handleHistoryClick = () => {
    setHistoryIsOpen(!historyIsOpen)
  }

  const handleHistoryMathClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const history = event.currentTarget.textContent
    const display = history?.slice(0, history.indexOf('='))
    if (display) {
      setDisplay(display)
    }
    setHistoryIsOpen(false)
  }

  useEffect(() => {
    if (error) {
      setError('')
    }
  }, [display.length])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Clicou fora da calculadora
      if (divCalculatorRef.current && !divCalculatorRef.current.contains(event.target as Node)) {
        setHistoryIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <AppContext.Provider
      value={{
        error,
        display,
        handleKey,
        inputDisplayRef,
        divCalculatorRef,
        historyIsOpen,
        historyMaths,
        handleHistoryClick,
        handleHistoryMathClick,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

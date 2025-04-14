import { RefObject, PropsWithChildren, createContext, useEffect, useRef, useState } from 'react'

export interface AppContextProps {
  error: string
  display: string
  historyIsOpen: boolean
  historyMaths: string[]
  handleHistoryClick: () => void
  handleHistoryMathClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
  validateKey: (key: string) => void
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

  const validateKey = (newKey: string) => {
    const operatorKeysRegex = /[+\-*/]/

    const lastKey = display.slice(-1)
    const lastKeyIsOperator = operatorKeysRegex.test(lastKey)
    const newKeyIsOperador = operatorKeysRegex.test(newKey)

    // Não permite que a primeira tecla seja um operador
    if (operatorKeysRegex.test(newKey) && display.length === 0) return

    // Não permite dois pontos seguidos
    if (lastKey === '.' && newKey === '.') return

    // Não permite dois operadores seguidos, o último toma o lugar do primeiro
    if (lastKeyIsOperator && newKeyIsOperador) {
      setDisplay(`${display.slice(0, -1)}${newKey}`)
      return
    }

    // Se o display está limpo (contém somente um zero) e digitar
    // ou teclar um número, esse número toma o lugar do zero
    const numberKeysRegex = /[0-9]/
    if (numberKeysRegex.test(newKey) && display.length === 1 && display === '0') {
      setDisplay(newKey)
      return
    }

    switch (newKey) {
      case '=':
      case 'enter':
        if (!lastKeyIsOperator) calculate(display)
        break
      case 'c':
        setDisplay('0')
        break
      case 'ce':
        setDisplay('0')
        setHistoryMaths([])
        break
      case '<':
      case 'backspace':
        setDisplay(display.slice(0, -1))
        break
      case '%':
        {
          const numbers = display.match(/(\d+(\.\d+)?)/g) || []
          const operators = display.match(/[+\-*/]/g) || []

          // Reescreve a expressão
          const lastOperator = operators[operators.length - 1]
          const lastOperatorIndex = display.lastIndexOf(lastOperator)

          const percentNumber = numbers[numbers.length - 1]
          const lastNumber = numbers[numbers.length - 2]

          const previousExpression = `${display.substring(0, lastOperatorIndex + 1)}`
          const percentExpression = `(${lastNumber}*(${percentNumber}/100))`

          const newExpression = `${previousExpression}${percentExpression}`

          calculate(newExpression)
          return
        }
        break
      default:
        setDisplay(`${display}${newKey}`)
    }
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
        validateKey,
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

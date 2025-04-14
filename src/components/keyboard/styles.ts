import styled from 'styled-components'

import { TKey } from './settings'

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2px;
`

export const Row = styled.div`
  display: flex;
  grid-column: 1 / span 4;
  grid-gap: 2px;
`

interface IButtonProps {
  type: TKey
}

export const Button = styled.button<IButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  min-width: 5rem;
  height: 60px;
  border-radius: 5px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.87);
  background-color: ${(props) => {
    switch (props.type) {
      case 'primaries':
        return '#3B3B3B'
      case 'specials':
        return '#323232'
      case 'equal':
        return '#F46762'
      default:
        return '#3B3B3B'
    }
  }};
`

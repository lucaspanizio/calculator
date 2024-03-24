import styled from 'styled-components';

export const Input = styled.input<{hasError: boolean}>`
  padding: 0.5em;
  width: 100%;
  outline: none;
  font-size: 1.5em;
  min-height: 1.5rem;
  height: 3rem;
  border-radius: 5px;
  text-align: right;
  color: #18181b;
  background-color: #e5e7eb;
  
  ${({ hasError }) => hasError && `
    font-size: 1.2rem;
    color: #991b1b;
  `}
`
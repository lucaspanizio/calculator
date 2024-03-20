import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  width: max-content;
  height: fit-content;
  border-radius: 10px;
  padding: 20px;
  color: #18181b;
  background-color: #202020;
  position: absolute;
  top: 0; 
  bottom: 0;
  left: 0; 
  right: 0;
  margin: auto;
`

export const ErrorLabel = styled.label`
  color: red;
`
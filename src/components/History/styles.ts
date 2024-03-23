import styled from 'styled-components';

interface IHistoryProps {
  isOpen: boolean;
}

export const Container = styled.div<IHistoryProps>`
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: #27272a;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  transition: height 0.5s ease-in-out;

  height: ${({isOpen}) => isOpen ? `88%` : `0px`};
`
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
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  z-index: 3;
  overflow-y: scroll;

  height: ${({isOpen}) => isOpen ? `88%` : `0px`};

  &::-webkit-scrollbar {
    display: none; // oculta a barra de rolagem
  }

  * {
    color: rgba(255, 255, 255, 0.87);
  }
`

export const Span = styled.span`
  position: absolute;
  text-align: center;
  padding-top: 15px;
  width: 100%;
`

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 15px 10px;
`

export const ListItem = styled.li`
  padding: 5px 10px;
  cursor: pointer;
  width: 100%;
  text-align: end;
  z-index: 4;

   &:hover {
    background-color: #303030;
     border-radius: 5px;
   }
`
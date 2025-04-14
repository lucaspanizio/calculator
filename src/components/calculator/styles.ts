import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  display: flex;
  margin: auto;
  inset: 0; /* Define top, right, bottom e left para 0 */
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  width: max-content;
  height: fit-content;
  padding: 15px;
  gap: 15px;
  color: #18181b;
  background-color: #202020;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  overflow: hidden;
  z-index: 1;
`

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(32, 32, 32, 0.7);
`

interface IHistoryProps {
  historyIsOpen: boolean;
}

export const HistoryButton = styled.button<IHistoryProps>`
  width: 30px;
  aspect-ratio: 1 / 1; // height proporcional
  border-radius: 30%;
  font-weight: 600;
  cursor: pointer;
  padding: px;
  background-color: transparent;
  text-align: center;
  align-self: flex-end;
  z-index: 2;
  opacity: ${({historyIsOpen}) => historyIsOpen ? 1 : 0.5};  

  &:hover{
    opacity: 1;
    background-color: #303030;
  }

  img {
    width: 20px;
    aspect-ratio: 1 / 1;
    vertical-align: middle; 
    user-select: none;
  }
`
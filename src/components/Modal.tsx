//implemented by Jerry
//Display an pop-up dialogue that can be opened and closed by clickin on the (x) button.

import styled from 'styled-components';
import CocktailDetail from './CocktailDetail';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  cocktailId: string;
}

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0.5,0.5,0.5,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 8px;
  padding: 5px;
  position: relative;
  width: 40%;
  max-height: 90vh;
  overflow-y: auto;
  box-sizing: border-box;
`;


const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: calc(10px + 10px);
  color:red;
  cursor: pointer;
`;

export default function Modal(props: ModalProps) {
  const {open, onClose, cocktailId} = props
  if (!open) return null;
  return (
    <Overlay>
      <ModalBox>
        <CloseButton onClick={onClose}>x</CloseButton>
        <CocktailDetail cocktailId={cocktailId} />
      </ModalBox>
    </Overlay>
  );
}

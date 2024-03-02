import React, { useState } from "react";
import { ModalOverlay, ModalContainer } from "./styledComponents";

const Modal = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContainer>{children}</ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;

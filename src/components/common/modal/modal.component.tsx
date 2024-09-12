import React, { ReactNode, useRef } from "react";
import ButtonForm from "../form/form-fields/button/button-form.component";
import { useClickOutside } from "src/hooks/common.hook";
import { XMarkIcon } from "@heroicons/react/24/solid";

export type TModalProps = {
  children: ReactNode;
  closeModal: () => void;
  modalHeaderTitle?: string;
};

const Modal = ({ children, closeModal, modalHeaderTitle }: TModalProps) => {
  const modalRef = useRef(null);

  useClickOutside({ ref: modalRef, callback: closeModal });
  return (
    <div className="modal-container">
      <div>
        <div ref={modalRef} className="modal-content-container">
          <div className="modal-header-container">
            <h3>{modalHeaderTitle}</h3>
            <ButtonForm hasIconButton={true} onClick={closeModal}>
              <XMarkIcon />
            </ButtonForm>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

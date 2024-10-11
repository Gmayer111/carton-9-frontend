import React from "react";
import Modal, { TModalProps } from "./modal.component";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import FormRoot from "../form/form-root.component";
import FormItems from "../form/form-items.component";
import { TFields } from "../form/form";
import ButtonForm from "../form/form-fields/button/button-form.component";

export type TCreateModalProps = Pick<
  TModalProps,
  "closeModal" | "modalHeaderTitle"
> & {
  modalFields: TFields[];
  displayModal: boolean;
  formMethods: UseFormReturn<FieldValues, any, undefined>;
  handleSubmit: SubmitHandler<FieldValues>;
  isEditModal?: boolean;
};

const CreateModal = ({
  modalFields,
  displayModal,
  closeModal,
  formMethods,
  handleSubmit,
  modalHeaderTitle,
  isEditModal,
}: TCreateModalProps) => {
  if (!displayModal) return null;

  return (
    <Modal closeModal={closeModal} modalHeaderTitle={modalHeaderTitle}>
      <FormProvider {...formMethods}>
        <FormRoot
          methods={formMethods}
          onSubmit={handleSubmit}
          isModalForm={true}
        >
          <FormItems fieldItems={modalFields} />
          <div className="buttons-action-modal-container">
            <ButtonForm
              type={"submit"}
              children={isEditModal ? "Modifier" : "Ajouter"}
            />
            <ButtonForm
              type={"button"}
              children="Annuler"
              onClick={closeModal}
              colorButton="alert"
            />
          </div>
        </FormRoot>
      </FormProvider>
    </Modal>
  );
};

export default CreateModal;

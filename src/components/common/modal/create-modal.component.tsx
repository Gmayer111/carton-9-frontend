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

export type TCreateModalProps = Pick<
  TModalProps,
  "closeModal" | "modalHeaderTitle"
> & {
  modalFields: TFields[];
  displayModal: boolean;
  formMethods: UseFormReturn<FieldValues, any, undefined>;
  handleSubmit: SubmitHandler<FieldValues>;
};

const CreateModal = ({
  modalFields,
  displayModal,
  closeModal,
  formMethods,
  handleSubmit,
  modalHeaderTitle,
}: TCreateModalProps) => {
  if (!displayModal) return null;

  return (
    <Modal closeModal={closeModal} modalHeaderTitle={modalHeaderTitle}>
      <FormProvider {...formMethods}>
        <FormRoot
          methods={formMethods}
          onSubmit={handleSubmit}
          hasCloseButton={true}
          handleCloseActionButton={closeModal}
        >
          <FormItems fieldItems={modalFields} />
        </FormRoot>
      </FormProvider>
    </Modal>
  );
};

export default CreateModal;

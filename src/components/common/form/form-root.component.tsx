import React from "react";
import Button from "./form-fields/button/button-form.component";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

export type TFormRootProps = {
  children: React.ReactNode;
  methods: UseFormReturn<FieldValues, any, undefined>;
  onSubmit: SubmitHandler<FieldValues>;
  title?: string;
  isModal?: boolean;
  paragraph?: string;
  isLoading?: boolean;
};

const FormRoot = ({
  children,
  title,
  paragraph,
  onSubmit,
  isLoading = false,
  isModal,
  methods,
}: TFormRootProps) => {
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <div className="form-header-container">
        <h1>{title}</h1>
        {paragraph && <p>{paragraph}</p>}
      </div>
      {children}
      <div className={isModal ? "buttons-modal-container" : ""}>
        <Button type={"submit"} isLoading={isLoading} children="Se connecter" />
        {isModal && (
          <Button type={"button"} isLoading={isLoading} children="Annuler" />
        )}
      </div>
    </form>
  );
};

export default FormRoot;

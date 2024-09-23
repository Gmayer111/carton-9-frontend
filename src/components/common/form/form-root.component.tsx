import React from "react";
import Button from "./form-fields/button/button-form.component";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

export type TFormRootProps = {
  children: React.ReactNode;
  methods: UseFormReturn<FieldValues, any, undefined>;
  onSubmit: SubmitHandler<FieldValues>;
  title?: string;
  paragraph?: string;
  isLoading?: boolean;
  isModalForm?: boolean;
};

const FormRoot = ({
  children,
  title,
  paragraph,
  onSubmit,
  isLoading = false,
  methods,
  isModalForm,
}: TFormRootProps) => {
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <div className="form-header-container">
        <h1>{title}</h1>
        {paragraph && <p>{paragraph}</p>}
      </div>
      {children}
      {!isModalForm && (
        <div>
          <Button
            type={"submit"}
            isLoading={isLoading}
            children="Se connecter"
          />
        </div>
      )}
    </form>
  );
};

export default FormRoot;

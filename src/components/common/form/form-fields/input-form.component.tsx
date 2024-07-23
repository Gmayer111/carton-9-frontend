import React, { forwardRef } from "react";
import { TField } from "../form.hook";
import LabelForm from "../common/label-form.component";
import ErrorMessage from "../common/error-message.component";

export type TInputProps = Omit<TField, "field"> & {
  name: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
};

export type InputRef = HTMLInputElement;

const InputForm = forwardRef<InputRef, TInputProps>(
  (
    {
      placeholder,
      name,
      disabled = false,
      required = true,
      value,
      inputType,
      label,
      errorMessage,
    },
    ref
  ) => {
    return (
      <div className="input-container">
        <LabelForm label={label} labelFor={name} />
        <input
          className="input-form"
          type={inputType}
          placeholder={placeholder}
          name={name}
          disabled={disabled}
          required={required}
          value={value}
          ref={ref}
        />
        <ErrorMessage errorMessage={errorMessage} />
      </div>
    );
  }
);

export default InputForm;

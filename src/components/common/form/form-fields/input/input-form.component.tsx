import React, { forwardRef, useId } from "react";
import { TField } from "../../form.hook";
import LabelForm from "../../common/label-form.component";
import ErrorMessage from "../../common/error-message.component";

export type TInputProps = Omit<TField, "field"> & {
  disabled?: boolean;
};

export type InputRef = HTMLInputElement;

const InputForm = forwardRef<InputRef, TInputProps>(
  (
    {
      placeholder,
      name,
      disabled = false,
      required = true,
      inputType,
      label,
      errorMessage,
    },
    ref
  ) => {
    const id = useId();
    return (
      <div className="input-container">
        <LabelForm label={label} id={id} />
        <input
          id={id}
          className="input-form"
          type={inputType}
          placeholder={placeholder}
          name={name}
          disabled={disabled}
          required={required}
          ref={ref}
        />
        <ErrorMessage errorMessage={errorMessage} />
      </div>
    );
  }
);

export default InputForm;

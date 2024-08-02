import React from "react";
import InputForm from "./form-fields/input/input-form.component";
import { TField } from "./form";
import { useFormContext } from "react-hook-form";

export type TFormItemsProps = {
  fieldItems: TField[];
};

const FormItems = ({ fieldItems }: TFormItemsProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      {fieldItems.map((fieldItem) => {
        const { field, inputType, placeholder, label, name, registerOptions } =
          fieldItem;

        return (
          <div>
            {field === "input" && (
              <InputForm
                inputType={inputType}
                placeholder={placeholder}
                label={label}
                errorMessage={
                  errors[name]?.message && (errors[name]?.message as string)
                }
                {...register(name, {
                  required: {
                    value: registerOptions?.required as boolean,
                    message: registerOptions?.requiredMessage as string,
                  },
                  pattern: {
                    value: registerOptions?.regexPattern as RegExp,
                    message: registerOptions?.regexPatternMessage as string,
                  },
                })}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FormItems;

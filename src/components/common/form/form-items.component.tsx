import React from "react";
import InputForm from "./form-fields/input/input-form.component";
import { TField } from "./form.hook";

export type TFormItemsProps = {
  fieldItems: TField[];
};

const FormItems = ({ fieldItems }: TFormItemsProps) => {
  return (
    <div>
      {fieldItems.map((fieldItem) => {
        const { field, inputType, placeholder, label, errorMessage } =
          fieldItem;
        return (
          <div>
            {field === "input" && (
              <InputForm
                name="test"
                inputType={inputType}
                placeholder={placeholder}
                label={label}
                errorMessage={errorMessage}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FormItems;

import React, { forwardRef } from "react";

export type TLabelProps = {
  label?: string;
  labelFor?: string;
};

export type LabelRef = HTMLLabelElement;

const LabelForm = forwardRef<LabelRef, TLabelProps>(
  ({ label, labelFor }, ref) => {
    if (!label) return null;

    return (
      <div>
        <label ref={ref} className="label-form" htmlFor={labelFor}>
          {label}
        </label>
      </div>
    );
  }
);

export default LabelForm;

import React from "react";
import { TButtonForm } from "../../form";

const ButtonForm = React.forwardRef<HTMLButtonElement, TButtonForm>(
  ({ isLoading, children, onClick, type, isDisabled, hasIconButton }, ref) => {
    return (
      <button
        className={hasIconButton ? "dropwdown-icon-button" : "button-form"}
        onClick={onClick}
        ref={ref}
        type={type}
        disabled={isLoading || isDisabled}
      >
        {children}
      </button>
    );
  }
);

export default ButtonForm;

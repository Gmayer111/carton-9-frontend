import React from "react";
import { TButtonType } from "../../form.hook";

export type TButtonProps = {
  isLoading: boolean;
  type: TButtonType;
  children: string;
  isDisabled?: boolean;
  onClick?: () => Promise<void>;
};

const ButtonForm = React.forwardRef<HTMLButtonElement, TButtonProps>(
  ({ isLoading, children, onClick, type, isDisabled }, ref) => {
    return (
      <button
        className="button-form"
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

import { FieldValues, RegisterOptions } from "react-hook-form";

export type TFields = {
  items: (TFieldItem & TInputForm & TSelectForm)[];
  columnSide?: "left" | "right";
};

export type TFieldItem = {
  fieldElement: TFieldElement;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  errorMessage?: string;
  registerOptions?: RegisterOptions<FieldValues, string>;
};

export type TFieldElement = "input" | "select" | "textarea";

export type TInputForm = {
  inputType?: TFieldType;
};

export type TFieldType =
  | "text"
  | "email"
  | "password"
  | "checkbox"
  | "date"
  | "radio"
  | "tel"
  | "file";

export type TSelectForm = {
  selectOptions?: selectOption[];
};

type selectOption = {
  value: string;
  content: string;
};

export type TButtonForm = {
  isLoading: boolean;
  type: TButtonType;
  children: string;
  isDisabled?: boolean;
  onClick?: () => Promise<void>;
};

export type TButtonType = "submit" | "reset" | "button" | undefined;

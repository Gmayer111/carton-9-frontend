export type TField = {
  field: TFieldElement;
  name: string;
  inputType?: TFieldType;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  required?: boolean;
};

export type TFieldElement = "input" | "select" | "textarea";

export type TFieldType =
  | "text"
  | "mail"
  | "password"
  | "checkbox"
  | "date"
  | "radio"
  | "tel";

export type TButtonType = "submit" | "reset" | "button" | undefined;

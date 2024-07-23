export type TField = {
  field: TFieldElement;
  inputType?: TFieldType;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
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

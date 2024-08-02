export type TField = {
  field: TFieldElement;
  name: string;
  inputType?: TFieldType;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  registerOptions?: TRegisterOption;
};

export type TRegisterOption = {
  required?: boolean;
  requiredMessage?: string;
  regexPattern?: RegExp;
  regexPatternMessage?: string;
};

export type TFieldElement = "input" | "select" | "textarea";

export type TFieldType =
  | "text"
  | "email"
  | "password"
  | "checkbox"
  | "date"
  | "radio"
  | "tel";

export type TButtonType = "submit" | "reset" | "button" | undefined;

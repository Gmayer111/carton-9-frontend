import React from "react";
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
  children?: React.ReactNode;
  type?: TButtonType;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => Promise<void> | void;
  hasIconButton?: boolean;
  colorButton?: "neutral" | "alert" | "primary";
};

export type TButtonType = "submit" | "reset" | "button" | undefined;

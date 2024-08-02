import { fireEvent, render, screen } from "@testing-library/react";
import ButtonForm from "./button-form.component";
import { TButtonType } from "../../form";

describe("When we want to pass props to button form", () => {
  it("should add button submit type", () => {
    const buttonProps = {
      isLoading: false,
      children: "cliquez-moi",
      type: "submit" as TButtonType,
    };
    render(<ButtonForm {...buttonProps} />) as Partial<HTMLButtonElement>;
    const submitButton = screen.getByRole("button");
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("should disabled button", () => {
    const buttonProps = {
      isLoading: false,
      children: "cliquez-moi",
      type: "submit" as TButtonType,
      isDisabled: true,
      onClick: jest.fn(),
    };
    render(<ButtonForm {...buttonProps} />) as Partial<HTMLButtonElement>;
    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(buttonProps.onClick).not.toHaveBeenCalled();
  });
});

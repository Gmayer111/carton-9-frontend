import { render, screen } from "@testing-library/react";
import TextareaForm from "./textarea-form.component";

describe("Textarea form component", () => {
  it("should have a value", () => {
    const textareaProps = {
      name: "description",
      defaultValue: "Je suis une description",
    };
    render(<TextareaForm {...textareaProps} />);

    expect(
      screen.getByDisplayValue("Je suis une description")
    ).toBeInTheDocument();
  });

  it("should add the right label", () => {
    const textareaProps = {
      name: "description",
      label: "Description",
    };
    render(<TextareaForm {...textareaProps} />);
    expect(screen.getByLabelText("Description")).toBeDefined();
  });

  it("should be disabled", () => {
    const textareaProps = {
      name: "description",
      label: "Description",
      disabled: true,
    };
    render(<TextareaForm {...textareaProps} />);
    const textarea = screen.getByLabelText("Description");
    expect(textarea).toBeDisabled();
  });

  it("should display error message", () => {
    const textareaProps = {
      name: "description",
      label: "Description",
      errorMessage: "There is some errors",
    };
    render(<TextareaForm {...textareaProps} />);
    const textarea = screen.getByText(
      "There is some errors"
    ) as HTMLTextAreaElement;
    expect(textarea).toBeDefined();
  });
});

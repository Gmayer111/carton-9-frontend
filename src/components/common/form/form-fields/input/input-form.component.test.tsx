import { render, screen, within } from "@testing-library/react";

import InputForm from "./input-form.component";
import React from "react";

describe("When we want to pass props to Input Form component", () => {
  it("should find the right placeholder", () => {
    const inputProps = {
      name: "firstname",
      placeholder: "firstname",
    };
    render(<InputForm {...inputProps} />);
    const input = screen.getByPlaceholderText("firstname") as HTMLInputElement;
    expect(input.placeholder).toBeDefined();
  });

  it("should add the right label", () => {
    const inputProps = {
      name: "firstName",
      label: "Firstname",
    };
    render(<InputForm {...inputProps} />);
    const input = screen.getByLabelText("Firstname") as HTMLInputElement;
    expect(input).toBeDefined();
  });

  it("should disabled input", () => {
    const inputProps = {
      name: "firstName",
      label: "Firstname",
      disabled: true,
    };
    render(<InputForm {...inputProps} />);
    const input = screen.getByLabelText("Firstname") as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it("should display error message", () => {
    const inputProps = {
      name: "firstName",
      label: "Firstname",
      errorMessage: "There is some errors",
    };
    render(<InputForm {...inputProps} />);
    const input = screen.getByText("There is some errors") as HTMLInputElement;
    expect(input).toBeDefined();
  });
});

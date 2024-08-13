import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectForm from "./select-form.component";

describe("When we want to pass props to Select Form component", () => {
  it("should correctly set defualt option", () => {
    const props = {
      name: "nationality",
      label: "Nationalité",
      selectOptions: [
        { value: "french", content: "french" },
        { value: "german", content: "german" },
      ],
    };
    render(<SelectForm {...props} />);
    expect(
      screen.getByRole("option", { name: "Sélectionnez une option" })
    ).toBeInTheDocument();
  });
  it("should have at least one select option", () => {
    const props = {
      name: "nationality",
      label: "Nationalité",
      selectOptions: [
        { value: "french", content: "french" },
        { value: "german", content: "german" },
      ],
    };
    render(<SelectForm {...props} />);
    expect(screen.getAllByRole("option").length).toBe(3);
  });

  it("should allow user to change nationality", () => {
    const props = {
      name: "nationality",
      label: "Nationalité",
      selectOptions: [
        { value: "french", content: "french" },
        { value: "german", content: "german" },
      ],
    };
    render(<SelectForm {...props} />);
    userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "french" })
    );
    expect(screen.getByRole("option", { name: "french" })).toBeInTheDocument();
  });
});

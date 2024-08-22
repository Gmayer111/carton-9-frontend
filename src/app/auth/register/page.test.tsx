import { fireEvent, render, screen } from "@testing-library/react";
import Register from "./page";

jest.mock("next/navigation");

describe("when user try to register", () => {
  it("should display error when value is required", async () => {
    render(<Register />);
    fireEvent.submit(screen.getByRole("button"));
    expect(await screen.findAllByRole("alert")).toHaveLength(5);
  });

  describe("and when he try to fill password fields", () => {
    beforeEach(() => {
      render(<Register />);

      fireEvent.input(screen.getByLabelText("Votre prénom"), {
        target: {
          value: "John",
        },
      });

      fireEvent.input(screen.getByLabelText("Votre nom"), {
        target: {
          value: "Doe",
        },
      });

      fireEvent.input(screen.getByLabelText("Votre email"), {
        target: {
          value: "test@mail.fr",
        },
      });
    });
    it("should display error when password format is invalid", async () => {
      fireEvent.input(screen.getByLabelText("Votre mot de passe"), {
        target: {
          value: "Secret1",
        },
      });

      fireEvent.submit(screen.getByRole("button"));
      expect(await screen.findAllByRole("alert")).toHaveLength(1);
    });
    it("should display error when matching passwords is invalid", async () => {
      fireEvent.input(screen.getByLabelText("Votre mot de passe"), {
        target: {
          value: "Secret123@!",
        },
      });

      fireEvent.input(screen.getByLabelText("Confirmation du mot de passe"), {
        target: {
          value: "sec",
        },
      });

      fireEvent.submit(screen.getByRole("button"));
      expect(await screen.findAllByRole("alert")).toHaveLength(1);
    });
  });
});

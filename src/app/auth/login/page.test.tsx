import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./page";

jest.mock("next-auth/react");
jest.mock("next/navigation");

describe("When user try to login", () => {
  it("should display required error when value is invalid", async () => {
    render(<Login />);
    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(2);
  });

  it("should display matching error when email is invalid", async () => {
    render(<Login />);

    fireEvent.input(screen.getByLabelText("Email"), {
      target: {
        value: "test",
      },
    });
    fireEvent.input(screen.getByLabelText("Mot de passe"), {
      target: {
        value: "password",
      },
    });
    fireEvent.submit(screen.getByRole("button"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(screen.getByLabelText("Email")).toHaveValue("test");
    expect(screen.getByLabelText("Mot de passe")).toHaveValue("password");
  });

  it("should not display error when values is valid", async () => {
    render(<Login />);
    fireEvent.input(screen.getByLabelText("Email"), {
      target: {
        value: "test@mail.fr",
      },
    });
    fireEvent.input(screen.getByLabelText("Mot de passe"), {
      target: {
        value: "password",
      },
    });
    fireEvent.submit(screen.getByRole("button"));
    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
  });
});

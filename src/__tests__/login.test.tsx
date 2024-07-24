import {fireEvent, render} from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from '../pages/Login';


describe("<LoginPage>", () => {
  it("should render correctly", () => {
    const {getByText} = render(<LoginPage />);
    expect(getByText("Login Page")).toBeInTheDocument();
  });

  describe("input email", () => {
    it("should be rendered", () => {
      const {getByPlaceholderText} = render(<LoginPage />);
      expect(getByPlaceholderText("Email")).toBeInTheDocument();
    });

    it("should be type of email", () => {
      render(<LoginPage />);
      expect(document.querySelector("input[type='email']")).toBeInTheDocument();
    });

    it("should have attribute name and be email", () => {
      render(<LoginPage />);
      const input = document.querySelector("input[type='email']");
      expect(input?.hasAttribute("name")).toBeTruthy();
      expect(input?.getAttribute("name")).toBe("email");
    });

    it("should initialize empty", () => {
      render(<LoginPage />);
      const input = document.querySelector<HTMLInputElement>(
        "input[type='email'][name='email']",
      );
      expect(input!.value).toBe("");
    });

    it("should receive focus", () => {
      render(<LoginPage />);
      const input = document.querySelector<HTMLInputElement>(
        "input[type='email'][name='email']",
      );
      input!.focus();
      expect(input).toHaveFocus();
    });

    it("should display input value 'testing element'", () => {
      const {getByPlaceholderText} = render(<LoginPage />);
      const input = getByPlaceholderText("Email");
      fireEvent.focus(input);
      fireEvent.change(input, {target: {value: "testing element"}});
      expect(input).toHaveValue("testing element");
    });

    describe("validations", () => {
      it("should be required", () => {
        render(<LoginPage />);
        const input = document.querySelector<HTMLInputElement>(
          "input[type='email'][name='email']",
        );
        expect(input).toHaveAttribute("required");
      });

      it("should have an error class while typing an invalid email", () => {
        render(<LoginPage />);
        const input = document.querySelector<HTMLInputElement>(
          "input[type='email'][name='email']",
        );
        fireEvent.change(input!, {target: {value: "wrong"}});

        expect(input?.classList.contains("error")).toBeTruthy();
      });

      it("should have a success class after entered an email", () => {
        render(<LoginPage />);
        const input = document.querySelector<HTMLInputElement>(
          "input[type='email'][name='email']",
        );
        fireEvent.change(input!, {target: {value: "test"}});

        expect(input?.classList.contains("success")).toBeTruthy();
      });

      it("should display an error message on blur when entered an invalid email", () => {
        const {getByText} = render(<LoginPage />);
        const input = document.querySelector<HTMLInputElement>(
          "input[type='email'][name='email']",
        );
        fireEvent.change(input!, {target: {value: "wrong"}});
        fireEvent.blur(input!);

        expect(getByText("Please, enter a valid email")).toBeInTheDocument();
      });
    });
  });
});

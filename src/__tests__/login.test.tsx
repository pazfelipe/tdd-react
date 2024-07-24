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

    it("should have attribute name with value email", () => {
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
        fireEvent.change(input!, {target: {value: "email@example.com"}});

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

  describe("input password", () => {
    it("should be rendered", () => {
      const {getByPlaceholderText} = render(<LoginPage />);
      expect(getByPlaceholderText("Password")).toBeInTheDocument();
    });
    it("should be type of password", () => {
      render(<LoginPage />);
      expect(document.querySelector("input[type='password']")).toBeInTheDocument();
    });
    it("should have attribute name and with value password", () => {
      render(<LoginPage />);
      const input = document.querySelector("input[type='password']");
      expect(input?.hasAttribute("name")).toBeTruthy();
      expect(input?.getAttribute("name")).toBe("password");
    });
    it("should initialize empty", () => {
      render(<LoginPage />);
      const input = document.querySelector<HTMLInputElement>(
        "input[type='password'][name='password']",
      );
      expect(input!.value).toBe("");
    });
    it("should receive focus", () => {
      render(<LoginPage />);
      const input = document.querySelector<HTMLInputElement>(
        "input[type='password'][name='password']",
      );
      input!.focus();
      expect(input).toHaveFocus();
    });

    it("should enter password '123456'", () => {
      const {getByPlaceholderText} = render(<LoginPage />);
      const input = getByPlaceholderText("Password");
      fireEvent.focus(input);
      fireEvent.change(input, {target: {value: "123456"}});
      expect(input).toHaveValue("123456");
    });

    it("should have a button to toggle password visibility", () => {
      render(<LoginPage />);
      expect(document.querySelector("button[role='toggle']")).toBeInTheDocument();
    });

    it("should able to toggle input password type", () => {
      render(<LoginPage />);
      const btn = document.querySelector("button[role='toggle']")

      const input = document.querySelector("input[name='password']") as HTMLInputElement
      
      fireEvent.click(btn!)
      expect(input.type).toBe("text")
      fireEvent.click(btn!)
      expect(input.type).toBe("password")
    });

    describe("validations", () => {
      it("should be required", () => {
        render(<LoginPage />);
        const input = document.querySelector<HTMLInputElement>(
          "input[type='password'][name='password']",
        );
        expect(input).toHaveAttribute("required");
      });
      
      it("should have a success class after entered a password", () => {
        render(<LoginPage />);
        const input = document.querySelector<HTMLInputElement>(
          "input[type='password'][name='password']",
        );
        fireEvent.change(input!, {target: {value: "123456"}});

        expect(input?.classList.contains("success")).toBeTruthy();
      });

      it("should display an error message on blur when input password has less than 6 characters", () => {
        render(<LoginPage />);
        const input = document.querySelector<HTMLInputElement>(
          "input[type='password'][name='password']",
        );
        fireEvent.change(input!, {target: {value: "123"}});

        expect(input?.classList.contains("error")).toBeTruthy();
      });

      it("should display an error message on blur when entered an invalid password", () => {
        const {getByText} = render(<LoginPage />);
        const input = document.querySelector<HTMLInputElement>(
          "input[name='password']",
        );
        fireEvent.change(input!, {target: {value: "123"}});
        fireEvent.blur(input!);

        expect(getByText("Your password must have at least 6 characters")).toBeInTheDocument();
      });
    });
  });

  describe("button submit", () => {
    it("should be rendered", () => {
      render(<LoginPage />);
      expect(document.querySelector("button[type='submit']")).toBeInTheDocument();
    });

    it("should be type of submit", () => {
      render(<LoginPage />);
      expect(document.querySelector("button[type='submit']")).toBeInTheDocument();
    });
    
    it.todo("should be disabled after submitting form");
    it.todo("should receive focus");

    describe("validations", () => {
      it.todo("should be disabled while email and password are not valid");
    });
  });

  describe("form", () => {
    it.todo("input email should be disabled after submiting");
    it.todo("input password should be disabled after submiting");
    it.todo("button submit should be disabled after submiting");
    it.todo("should display a message for credentials not found");
    it.todo("should display a message for login successfuly");
  });

});

import {fireEvent, render} from '@testing-library/react';
import "@testing-library/jest-dom";
import {useState} from 'react';

const LoginPage = () => {
  const [value, setValue] = useState("");
  return (
    <div>Login Page

      <input placeholder='Email' type='email' name='email' required value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};

describe("<LoginPage>", () => {
  it("should render correctly", () => {
    const {getByText} = render(<LoginPage />);
    expect(getByText('Login Page')).toBeInTheDocument();
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
      const input = document.querySelector<HTMLInputElement>("input[type='email'][name='email']");
      expect(input!.value).toBe("");
    });

    it("should receive focus", () => {
      render(<LoginPage />);
      const input = document.querySelector<HTMLInputElement>("input[type='email'][name='email']");
      input!.focus();
      expect(input).toHaveFocus();
    });

    it("should display input value 'testing element'", () => {
      const {getByPlaceholderText} = render(<LoginPage />);
      const input = getByPlaceholderText("Email");
      fireEvent.focus(input);
      fireEvent.change(input, {target: {value: 'testing element'}});
      expect(input).toHaveValue('testing element');
    });

    describe("validations", () => {
      it("should be required", () => {
        render(<LoginPage />);
        const input = document.querySelector<HTMLInputElement>("input[type='email'][name='email']");
        expect(input?.required).toBeTruthy();
      })
    })
  });
});
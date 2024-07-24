import {render} from '@testing-library/react';
import "@testing-library/jest-dom";

const LoginPage = () => <div>Login Page

  <input placeholder='Email' type='email' name='email'/>
</div>;

describe("<LoginPage>", () => {
  it("should render correctly", () => {
    const {getByText} = render(<LoginPage />);
    expect(getByText('Login Page')).toBeInTheDocument();
  });

  describe("input email", () => {
    it("should be rendered", () => {
      const {getByPlaceholderText} = render(<LoginPage />);
      expect(getByPlaceholderText("Email")).toBeInTheDocument()
    });

    it("should be type of email", () => {
      render(<LoginPage />);
      expect(document.querySelector("input[type='email']")).toBeInTheDocument()
    });

    it("should have attribute name and be email", () => {
      render(<LoginPage />);
      const input = document.querySelector("input[type='email']")
      expect(input?.hasAttribute("name")).toBeTruthy()
      expect(input?.getAttribute("name")).toBe("email")
    })
  })
});
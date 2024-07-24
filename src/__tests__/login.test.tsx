import {render} from '@testing-library/react';
import "@testing-library/jest-dom"

const LoginPage = () => <div>Login Page</div>;

describe("<LoginPage>", () => {
  it("should render correctly", () => {
    const {getByText} = render(<LoginPage />);
    expect(getByText('Login Page')).toBeInTheDocument()
  });
});
import {render} from '@testing-library/react';
import "@testing-library/jest-dom"


describe("<LoginPage>", () => {
  it("should render correctly", () => {
    const {getByText} = render(<LoginPage />);
    expect(getByText('Login Page')).toBeInTheDocument()
  });
});
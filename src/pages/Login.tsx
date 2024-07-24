import { ChangeEvent, useState } from 'react';

const LoginPage = () => {
  const [value, setValue] = useState("");
  const [lostFocus, setLostFocus] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setLostFocus(false);
    setIsValid(validateEmail(newValue));
  };

  return (
    <div>
      Login Page
      <div>
        <input
          placeholder="Email"
          type="email"
          name="email"
          required
          value={value}
          onChange={onChange}
          onFocus={() => setLostFocus(false)}
          onBlur={() => setLostFocus(true)}
          className={isValid ? "success" : "error"}
        />
        {lostFocus && !isValid && (
          <span>Please, enter a valid email</span>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

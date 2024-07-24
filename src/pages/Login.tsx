import {ChangeEvent, useState} from "react";

const LoginPage = () => {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisibility] = useState(false);
  const [lostFocus, setLostFocus] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setLostFocus(false);
    setIsValid(validateEmail(newValue));
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setLostFocus(false);
    setIsPasswordValid(validatePassword(newValue));
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
          onChange={onChangeEmail}
          onFocus={() => setLostFocus(false)}
          onBlur={() => setLostFocus(true)}
          className={isValid ? "success" : "error"}
        />
        {lostFocus && !isValid && <span>Please, enter a valid email</span>}
      </div>
      <div>
        <div>
          <input
            placeholder="Password"
            type={visible ? "text" : "password"}
            name="password"
            required
            value={password}
            onChange={onChangePassword}
            onFocus={() => setLostFocus(false)}
            onBlur={() => setLostFocus(true)}
            className={isPasswordValid ? "success" : "error"}
          />
          {lostFocus && !isPasswordValid && <span>Your password must have at least 6 characters</span>}
        </div>
        <button type='button' role='toggle' onClick={() => setVisibility(!visible)}></button>
      </div>
    </div>
  );
};

export default LoginPage;

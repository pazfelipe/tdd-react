import {ChangeEvent, useState} from "react";

const LoginPage = () => {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisibility] = useState(false);
  const [lostFocus, setLostFocus] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setLostFocus(null);
    setIsValid(validateEmail(newValue));
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setLostFocus(null);
    setIsPasswordValid(validatePassword(newValue));
  };

  const onHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if(value !== 'email@example.com' || password !== '123456') {
      setIsLoading(false);
      setErrorMsg('Wrong credentials or user not found')
      return
    }
  };

  return (
    <div>
      Login Page
      <form action="" onSubmit={onHandleSubmit}>
        <div>
          <input
            placeholder="Email"
            type="email"
            name="email"
            required
            value={value}
            disabled={isLoading}
            onChange={onChangeEmail}
            onFocus={() => setLostFocus(null)}
            onBlur={() => setLostFocus('email')}
            className={isValid ? "success" : "error"}
          />
          {lostFocus === 'email' && !isValid && <span>Please, enter a valid email</span>}
        </div>
        <div>
          <div>
            <input
              placeholder="Password"
              type={visible ? "text" : "password"}
              name="password"
              required
              value={password}
              disabled={isLoading}
              onChange={onChangePassword}
              onFocus={() => setLostFocus(null)}
              onBlur={() => {
                setLostFocus('password');
                setIsValid(isValid);
              }}
              className={isPasswordValid ? "success" : "error"}
            />
            {lostFocus === 'password' && !isPasswordValid && <span>Your password must have at least 6 characters</span>}
          </div>
          <button type='button' role='toggle' onClick={() => setVisibility(!visible)}></button>
        </div>
        <button type="submit" disabled={isLoading || !isValid || !isPasswordValid}></button>
      </form>
      {errorMsg && <span>{errorMsg}</span>}
    </div>
  );
};

export default LoginPage;

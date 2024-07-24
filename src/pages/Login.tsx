import {ChangeEvent, useRef, useState} from 'react';

const LoginPage = () => {
  const [value, setValue] = useState("");
  const [lostFocus, setLostFocus] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setLostFocus(false);

    if (!/^test$/.test(e.target.value)) {
      emailRef.current?.classList.add("error");
      emailRef.current?.classList.remove("success");
    } else {
      emailRef.current?.classList.remove("error");
      emailRef.current?.classList.add("success");
    }
  };

  return (
    <div>
      Login Page
      <div>
        <input
          ref={emailRef}
          placeholder="Email"
          type="email"
          name="email"
          required
          value={value}
          onChange={onChange}
          onFocus={() => setLostFocus(false)}
          onBlur={() => setLostFocus(true)}
        />
        {lostFocus && emailRef.current?.classList.contains("error") && (
          <span>Please, enter a valid email</span>
        )}
      </div>
    </div>
  );
};

export default LoginPage
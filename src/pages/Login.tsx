import {ChangeEvent, useState} from "react";
import useLoginValidation, {EACTION} from '../hooks/useLoginValidation';

const LoginPage = () => {
  const {state, dispatch} = useLoginValidation();
  const [visible, setVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({type: EACTION.SET_EMAIL, payload: e.target.value});
    dispatch({type: EACTION.SET_FOCUS, payload: null});
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({type: EACTION.SET_PASSWORD, payload: e.target.value});
    dispatch({type: EACTION.SET_FOCUS, payload: null});
  };

  const onHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (state.email !== 'email@example.com' || state.password !== '123456') {
      setIsLoading(false);
      setErrorMsg('Wrong credentials or user not found');
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
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
            value={state.email}
            disabled={isLoading}
            onChange={onChangeEmail}
            onFocus={() => dispatch({type: EACTION.SET_FOCUS, payload: null})}
            onBlur={() => dispatch({type: EACTION.SET_FOCUS, payload: 'email'})}
            className={state.isEmailValid ? "success" : "error"}
          />
          {state.lostFocus === 'email' && !state.isEmailValid && <span>Please, enter a valid email</span>}
        </div>
        <div>
          <div>
            <input
              placeholder="Password"
              type={visible ? "text" : "password"}
              name="password"
              required
              value={state.password}
              disabled={isLoading}
              onChange={onChangePassword}
              onFocus={() => dispatch({type: EACTION.SET_FOCUS, payload: null})}
              onBlur={() => dispatch({type: EACTION.SET_FOCUS, payload: 'password'})}
              className={state.isPasswordValid ? "success" : "error"}
            />
            {state.lostFocus === 'password' && !state.isPasswordValid && <span>Your password must have at least 6 characters</span>}
          </div>
          <button type='button' role='toggle' onClick={() => setVisibility(!visible)}></button>
        </div>
        <button type="submit" disabled={isLoading || !state.isEmailValid || !state.isPasswordValid}></button>
      </form>
      {errorMsg && <span>{errorMsg}</span>}
    </div>
  );
};

export default LoginPage;

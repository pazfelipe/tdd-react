import {ChangeEvent, useState} from "react";
import useLoginValidation, {EACTION} from "../hooks/useLoginValidation";
import Icon from "@mdi/react";
import {mdilEye, mdilEyeOff} from "@mdi/light-js";

const LoginPage = () => {
  const {state, dispatch} = useLoginValidation();
  const [visible, setVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
    setErrorMsg("");

    if (state.email !== "email@example.com" || state.password !== "123456") {
      setIsLoading(false);
      setErrorMsg("Wrong credentials or user not found");
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen w-full">
      <span className="hidden lg:flex w-2/3 bg-indigo-800"></span>

      <div className="w-4/5 m-auto flex flex-col items-center justify-center p-4 lg:flex-1">
        <h1 className="text-2xl text-indigo-800 font-semibold text-center">
          Welcome back
        </h1>

        <div className="flex flex-col gap-1 text-gray-600 text-sm my-4 justify-center items-center">
          <span>Glad to see you here</span>
          <span>Login to your account bellow</span>
        </div>

        <form
          action=""
          onSubmit={onHandleSubmit}
          className="h-2/3 w-full flex flex-col gap-2 justify-center items-center"
        >
          <div className="flex flex-col gap-1 w-full min-h-10">
            <div
              className={`w-full flex items-center p-2 border border-indigo-800 rounded-md ${!state.isEmailValid && state.lostFocus === 'email' ? "error border-red-300" : 'success'}`}
            >
              <input
                placeholder="Email"
                type="email"
                name="email"
                required
                value={state.email}
                disabled={isLoading}
                onChange={onChangeEmail}
                onFocus={() =>
                  dispatch({type: EACTION.SET_FOCUS, payload: null})
                }
                onBlur={() =>
                  dispatch({type: EACTION.SET_FOCUS, payload: "email"})
                }
                className={`w-full outline-none text-gray-600`}
              />
            </div>
            {state.lostFocus === "email" && !state.isEmailValid && (
              <span className="text-red-600 text-sm">
                Please, enter a valid email
              </span>
            )}
          </div>

          <div className={`w-full flex items-center`}>
            <div className="flex flex-col gap-1 flex-1 min-h-20">
              <div
                className={`w-full flex items-center p-2 border border-indigo-800 rounded-md ${!state.isPasswordValid && state.lostFocus === 'password' ? "error border-red-300" : "success"}`}
              >
                <input
                  placeholder="Password"
                  type={visible ? "text" : "password"}
                  name="password"
                  required
                  value={state.password}
                  disabled={isLoading}
                  onChange={onChangePassword}
                  onFocus={() =>
                    dispatch({type: EACTION.SET_FOCUS, payload: null})
                  }
                  onBlur={() =>
                    dispatch({type: EACTION.SET_FOCUS, payload: "password"})
                  }
                  className={`w-full outline-none text-gray-600`}
                />
                <button
                  type="button"
                  role="toggle"
                  onClick={() => setVisibility(!visible)}
                  className="w-6 h-6"
                >
                  <Icon
                    path={visible ? mdilEye : mdilEyeOff}
                    size={1}
                  />
                </button>
              </div>
              {state.lostFocus === "password" && !state.isPasswordValid && (
                <span className="text-red-600 text-sm">
                  Your password must have at least 6 characters
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={
              isLoading || !state.isEmailValid || !state.isPasswordValid
            }
            className={`w-full flex gap-2 items-center justify-center bg-indigo-800 text-white py-4 rounded-md disabled:cursor-not-allowed disabled:opacity-70`}
          >
            {isLoading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}

            <span>Login</span>
          </button>
        </form>
        {errorMsg && (
          <span className="mt-4 text-sm text-red-600 bg-red-200 rounded-md p-4 w-full text-center">
            {errorMsg}
          </span>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

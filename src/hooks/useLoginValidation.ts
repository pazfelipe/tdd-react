import {useReducer, Reducer} from "react";

interface State {
  email: string;
  password: string;
  isEmailValid: boolean;
  isPasswordValid: boolean;
  lostFocus: string | null;
}

export enum EACTION {
  SET_EMAIL = "SET_EMAIL",
  SET_PASSWORD = "SET_PASSWORD",
  SET_FOCUS = "SET_FOCUS",

}

type Action =
  | {type: EACTION.SET_EMAIL; payload: string;}
  | {type: EACTION.SET_PASSWORD; payload: string;}
  | {type: EACTION.SET_FOCUS; payload: string | null;};

const initialState: State = {
  email: '',
  password: '',
  isEmailValid: false,
  isPasswordValid: false,
  lostFocus: null,
};

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password: string) => password.length >= 6;

const loginReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case EACTION.SET_EMAIL:
      return {
        ...state,
        email: action.payload,
        isEmailValid: validateEmail(action.payload),
      };
    case EACTION.SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
        isPasswordValid: validatePassword(action.payload),
      };
    case EACTION.SET_FOCUS:
      return {
        ...state,
        lostFocus: action.payload,
      };
    default:
      return state;
  }
};

const useLoginValidation = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  return {state, dispatch};
};

export default useLoginValidation;
export {initialState, loginReducer};

import { LOGIN, PASSWORD } from "../components/constans/constans";

const initialState = {
  login: "",
  password: "",
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, login: action.payload };
    case PASSWORD:
      return { ...state, login: action.payload };
    default:
      return state;
  }
}

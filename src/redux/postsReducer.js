import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  SEARCH,
} from "../components/constans/constans";

export const initialState = {
  value: "",
  posts: [],
  loading: false,
  hasErrors: false,
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH:
      return { ...state, value: action.payload };
    case GET_POSTS:
      return { ...state, loading: true };
    case GET_POSTS_SUCCESS:
      return { posts: action.payload, loading: false, hasErrors: false };
    case GET_POSTS_FAILURE:
      return { ...state, loading: false, hasErrors: true };
    default:
      return state;
  }
}

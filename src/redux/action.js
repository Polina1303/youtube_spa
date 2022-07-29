import axios from "axios";
import {
  ADD_VALUE,
  CHANGE_FAVOURITES,
  DELETE_FAVOURITES,
} from "../components/constans/constans";
import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  SEARCH,
} from "../components/constans/constans";

export const login = (type, payload) => {
  return {
    type,
    payload,
  };
};

export const password = (type, payload) => {
  return {
    type,
    payload,
  };
};

export const favoritesAction = (data) => {
  console.log("action", data);
  return {
    type: ADD_VALUE,
    payload: {
      id: data.id,
      login: data.user,
      request: data.request,
      title: data.name,
      sort: data.sort,
      maxVideos: data.maxVideos,
    },
  };
};

export const changeFavorites = (data) => {
  console.log("action2");
  return {
    type: CHANGE_FAVOURITES,
    payload: {
      id: data.id,
      login: data.user,
      request: data.request,
      title: data.title,
      sort: data.sort,
      maxVideos: data.maxVideos,
    },
  };
};

export const deleteFavourites = (id) => {
  return {
    type: DELETE_FAVOURITES,
    payload: id,
  };
};

export const getPosts = () => ({
  type: GET_POSTS,
});

export const getPostsSuccess = (posts) => ({
  type: GET_POSTS_SUCCESS,
  payload: posts,
});

export const getPostsFailure = () => ({
  type: GET_POSTS_FAILURE,
});

export const search = (type, payload) => {
  return {
    type,
    payload,
  };
};

const KEY = "AIzaSyDGe046-b4QJAWJfVRH9493fuijBM85Pjs";

export function axiosPosts(value) {
  return async (dispatch) => {
    dispatch(getPosts());
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            type: "video",
            maxResults: 12,
            order: "relevance",
            q: value,
            key: KEY,
          },
        }
      );
      const data = await response;
      dispatch(getPostsSuccess(data));
    } catch (error) {
      dispatch(getPostsFailure());
    }
  };
}

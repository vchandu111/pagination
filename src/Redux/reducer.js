import {
  GET_GITHUB_USER_SUCCESS,
  GET_GITHUB_USER_FAILURE,
  GET_GITHUB_USER_REQUEST,
} from "./actiontypes";

export const initState = {
  isLoading: false,
  isError: "",
  githubUsers: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_GITHUB_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
      };
    case GET_GITHUB_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        githubUsers: action.payload,
      };

    case GET_GITHUB_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    default:
      return state;
  }
};

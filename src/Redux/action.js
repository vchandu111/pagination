import {
  GET_GITHUB_USER_SUCCESS,
  GET_GITHUB_USER_FAILURE,
  GET_GITHUB_USER_REQUEST,
} from "./actiontypes";

import axios from "axios";

export const get_github_user_request = (payload) => ({
  type: GET_GITHUB_USER_REQUEST,
  payload,
});
export const get_github_user_failure = (payload) => ({
  type: GET_GITHUB_USER_FAILURE,
  payload,
});
export const get_github_user_success = (payload) => ({
  type: GET_GITHUB_USER_SUCCESS,
  payload,
});

export const getGithubUser = (payload) => (dispatch) => {
  dispatch(get_github_user_request(payload));
  return axios
    .get(`https://api.github.com/search/users?q=${payload.username}`)
    .then((res) => dispatch(get_github_user_success(res.data.items)))
    .catch((err) => dispatch(get_github_user_failure(err)));
};

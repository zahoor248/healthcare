import {
  GET_ALL_PROS,
  SET_USER,
  LOGOUT,
  APPLOADING,
  UPDATE_USER,
  GET_FAV,
  isLOGGED_IN,
  ALL_RESERVATION,
} from "./ActionType";

export const setUser = (payload) => async (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: payload,
  });
};
export const setIsLoggedIn = (payload) => async (dispatch) => {
  dispatch({
    type: isLOGGED_IN,
    payload: payload,
  });
};

export const updateUser = (payload) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER,
    payload: payload,
  });
};
export const setAppLoading = (payload) => async (dispatch) => {
  dispatch({
    type: APPLOADING,
    payload: payload,
  });
};
export const getAllPros = (payload) => async (dispatch) => {
  dispatch({
    type: GET_ALL_PROS,
    payload: payload,
  });
};

export const getAllFav = (payload) => async (dispatch) => {
  dispatch({
    type: GET_FAV,
    payload: payload,
  });
};
export const setAllReasevation = (payload) => async (dispatch) => {
  dispatch({
    type: ALL_RESERVATION,
    payload: payload,
  });
};

import axios from "axios";
import { BASE_URL } from "../Api/BaseUrl";
import { setAppLoading } from "../Store/Actions/Actions";
import store from "../Store/Store";

export const handleAPIRequest = async (method, url, data, params) => {
  const state = store.getState();

  // store.dispatch(setAppLoading(true));

  let header = null;

  if (method === "post" || method === "put") {
    header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.user && state.user.token}`,
    };
  } else {
    header = {
      Authorization: `Bearer ${state.user && state.user.token}`,
    };
  }
  try {
    const response = await axios({
      method: method,
      url: `${BASE_URL}${url}`,
      headers: header,
      data: data,
      params: params,
    });

    console.warn(response.data, "faskjhfasjkfahksfhaksfjahs");
    // store.dispatch(setAppLoading(false));
    return response.data;
  } catch (error) {
    console.error(error);
    // store.dispatch(setAppLoading(false));

    throw new Error(error);
  }
};

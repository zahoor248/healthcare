import {
  APPLOADING,
  GET_ALL_PROS,
  LOGOUT,
  SET_USER,
  UPDATE_USER,
  GET_FAV,
  isLOGGED_IN,
  ALL_RESERVATION,
  CONTRACTS,
} from "../Actions/ActionType";

const initialState = {
  user: null,
  pros: [],
  appLoading: false,
  favourites: [],
};
const Reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      console.log("Setting user in reducer:", payload);
      return {
        ...state,
        user: payload,
      };
    case isLOGGED_IN:
      console.log("Setting user in reducer:", payload);
      return {
        ...state,
        isLoggedIn: payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: payload,
      };
    case GET_FAV:
      return {
        ...state,
        favourites: payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: payload,
      };
    case GET_ALL_PROS:
      return {
        ...state,
        pros: payload,
      };
      case ALL_RESERVATION:
        return {
          ...state,
          reservations: payload,
        };
        case CONTRACTS:
          return {
            ...state,
            contracts: payload,
          };
    case APPLOADING:
      return {
        ...state,
        appLoading: payload,
      };
    default:
      return state;
  }
};
export default Reducer;

import { createStore, applyMiddleware, compose } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import Reducer from "./Reducers/UserReducer";

const middleware = [thunk];

const store = createStore(
  Reducer, // root reducer with router state

  composeWithDevTools(
    applyMiddleware(
      // routerMiddleware(history),
      ...middleware // for dispatching history actions
      // ... other middlewares ...
    )
  )
);

export default store;

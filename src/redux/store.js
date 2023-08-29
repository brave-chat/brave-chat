import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const bindMiddleware = (middleware) => {
  if (process.env.REACT_APP_STAGE === "dev") {
    const { composeWithDevTools } = require("@redux-devtools/extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};
const store = createStore(rootReducer, bindMiddleware([thunk]));

export default store;

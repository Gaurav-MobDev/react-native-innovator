import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducers";

const isDevelopmentEnv =
  process && process.env && process.env.NODE_ENV === "development";
function setLogger() {
  if (isDevelopmentEnv) {
    return [...getDefaultMiddleware({ serializableCheck: false })];
  }
  return [...getDefaultMiddleware({ serializableCheck: false })];
}
const store = configureStore({
  reducer,
  middleware: setLogger,
});

export default store;

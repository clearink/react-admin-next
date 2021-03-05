import { configureStore, getDefaultMiddleware, Action } from "@reduxjs/toolkit";
// import logger from "redux-logger"
import { ThunkAction } from "redux-thunk";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware().concat(),
});

// 热模块替换
if (process.env.NODE_ENV === "development" && (module as any).hot) {
  (module as any).hot.accept("./reducers", () => {
    const newRootReducer = require("./reducers").default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>;

export default store;

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { usersApi } from "../services/usersApi";
import { appSlice } from "./appSlice";
import { userSlice } from "./userSlice";

const Reducer = combineReducers({
  user: userSlice.reducer,
  app: appSlice.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blackList: [usersApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, Reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, usersApi.middleware],
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

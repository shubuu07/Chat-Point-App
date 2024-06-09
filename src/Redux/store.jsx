import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import userSlice from "./slice/userSlice";
import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from "redux-thunk";

const persistConfig = {
    key: 'SendMessage',
    version: 1,
    storage: AsyncStorage,
};

const rootReducers = combineReducers({
    user: userSlice,
});

let persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore(
    {
        reducer: persistedReducer,
        middleware: [thunk]
    }
)
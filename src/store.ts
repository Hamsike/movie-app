import { combineReducers, configureStore } from "@reduxjs/toolkit";
import favoriteReducer from './slices/favoritesSlice'
import storage from "redux-persist/es/storage";
import { persistReducer, persistStore } from "redux-persist";
import compareReducer from './slices/compareSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['favorites'],
}

const rootReducer = combineReducers({
    favorites: favoriteReducer,
    compare: compareReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            }
        })

})


export const persistor = persistStore(store);

export type RootType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

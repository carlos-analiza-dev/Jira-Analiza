import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionReducer from "./auth/sessionSlice";
import countryReducer from "./pais/paiseSlice"; // Importa el reducer adicional

// Configuración de persistencia
const persistConfig = {
  key: "root",
  storage,
};

// Combina los reducers
const rootReducer = combineReducers({
  auth: sessionReducer,
  country: countryReducer, // Agrega aquí el reducer adicional
});

// Aplica persistencia al reducer combinado
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuración del store
export const store = configureStore({
  reducer: persistedReducer,
});

// Configuración del persistor
export const persistor = persistStore(store);

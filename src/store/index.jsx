import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { persistStore, persistCombineReducers } from "redux-persist"
import storage from "redux-persist/lib/storage"
import adminReducer from "./reducer/adminReducer"
import userReducer from "./reducer/userReducer"

const persistConfig = {
  key: "persist-key",
  /*   blacklist: ["admin"], */
  storage
}

const reducerCombine = persistCombineReducers(persistConfig, {
  user: userReducer,
  admin: adminReducer
})

/*  */

const store = createStore(reducerCombine, composeWithDevTools(applyMiddleware(thunk)))
const persistor = persistStore(store)
export default store
export { persistor }


import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { generalDataReducer} from "./reducer/generalDataReducer"
 const reducer = combineReducers({
  generalData: generalDataReducer,

});

export const rootReducer =createStore(reducer,applyMiddleware(thunk))


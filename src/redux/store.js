
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { generalDataReducer} from "./reducer/generalDataReducer"
import { laptopDataReducer} from "./reducer/laptopDataReducer"
 const reducer = combineReducers({
  generalData: generalDataReducer,
  laptopData:laptopDataReducer,
});

export const rootReducer =createStore(reducer,applyMiddleware(thunk))


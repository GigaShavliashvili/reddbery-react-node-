import { actionType } from "../actionType";
const initialState = {
    laptopList:[],
    laptopDetail:[]
}


export const laptopDataReducer = (state = initialState, action) =>{
switch(action.type){
    case actionType.FETCH_LAPTOPSLIST_DATA:{
        return {
            ...state,
            laptopList:action.payload
        }
    }
    case actionType.FETCH_LAPTOPDETAILS_DATA:{
        return {
            ...state,
            laptopDetail:action.payload
        }
    }
    default:{
        return state
    }
}
}
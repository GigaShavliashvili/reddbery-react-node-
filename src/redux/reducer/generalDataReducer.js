import React from 'react'
import { actionType } from '../actionType'
const initialState = {
    teams:[],
    brand:[],
    cpus:[],
    position:[],
}
 export const  generalDataReducer = (state= initialState, action) => {
switch(action.type) {
case actionType.FETCH_BRANDS_DATA:{
    return{
        ...state,
        brand: action.payload,
    }
}
case actionType.FETCH_TEAMS_DATA:{
    return{
        ...state,
        teams: action.payload,
    }
}
case actionType.FETCH_POSITION_DATA:{
    return{
        ...state,
        position: action.payload,
    }
}
case actionType.FETCH_CPUS_DATA:{
    return{
        ...state,
        cpus: action.payload,
    }
}

default: {
    return state;
  }
}
}


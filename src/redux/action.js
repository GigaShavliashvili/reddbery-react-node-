import {actionType} from "./actionType"
export const fetchBrandsAction = (res) =>{
   return {
    type: actionType.FETCH_BRANDS_DATA,
    payload: res
   }
}
export const fetchTeamsAction = (res) =>{
    return {
     type: actionType.FETCH_TEAMS_DATA,
     payload: res
    }
 }
 export const fetchPositionAction = (res) =>{
    return {
     type: actionType.FETCH_POSITION_DATA,
     payload: res
    }
 }
 export const fetchCpusAction= (res) =>{
    return {
     type: actionType.FETCH_CPUS_DATA,
     payload: res
    }
 }
 
import axios from "axios";
import { baseUrl } from "../configs/api";
import { fetchBrandsAction,fetchTeamsAction,fetchPositionAction,fetchCpusAction } from "../redux/action";




export const fetchTeamsData = () =>{
    return (dispatch) => {
 axios({
    method: "GET",
    url:baseUrl("/api/teams")
}).then((res) =>{

    dispatch(fetchTeamsAction(res.data.data))
}).catch((err) =>{
    console.log(err);
})
    }
}




export const fetchBrandsData = () =>{
    return (dispatch) => { axios({
        method: "GET",
        url:baseUrl("/api/brands")
    }).then((res) =>{
    
        dispatch(fetchBrandsAction(res.data.data))
    }).catch((err) =>{
        console.log(err);
    }) }
    }


    export const fetchCpusData = () =>{
        return (dispatch) => { axios({
            method: "GET",
            url:baseUrl("/api/cpus")
        }).then((res) =>{
        
            dispatch(fetchCpusAction(res.data.data))
        }).catch((err) =>{
            console.log(err);
        }) }
        }


        export const fetchPositionData = () =>{
            return (dispatch) => { axios({
                method: "GET",
                url:baseUrl("/api/positions")
            }).then((res) =>{
            
                dispatch(fetchPositionAction(res.data.data))
            }).catch((err) =>{
                console.log(err);
            })
        }
            }




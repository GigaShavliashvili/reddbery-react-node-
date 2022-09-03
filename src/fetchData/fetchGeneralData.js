import { baseUrl } from "../configs/api";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { fetchBrandsAction,fetchTeamsAction,fetchPositionAction,fetchCpusAction } from "../redux/action";




export const fetchTeamsData = () =>{
    return (dispatch) => {
 axios({
    method: "GET",
    url:baseUrl("/api/teams")
}).then((res) =>{
    console.log(res);
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
        console.log(res);
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
            console.log(res);
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
                console.log(res);
                dispatch(fetchPositionAction(res.data.data))
            }).catch((err) =>{
                console.log(err);
            })
        }
            }




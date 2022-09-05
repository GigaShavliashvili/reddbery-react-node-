import axios from "axios"
import {baseUrl} from "../configs/api"
import { fetchLaptopDetailAction, fetchLaptopListAction } from "../redux/action"


export const fetchLaptopListData = () =>{
    return (dispatch) =>{
        axios({
            method: "GET",
            url: baseUrl("/api/laptops"),
            params: {
                token: process.env.REACT_APP_API_TOKEN,
            },
    }).then(res =>{
        dispatch(fetchLaptopListAction(res.data.data))
    }).catch(err =>{
        console.log(err);
    })
 }
}

/* 
export const fetchLaptopDetailListData = (id) =>{
    return (dispatch) =>{
        axios({
            method: "GET",
            url: baseUrl(`/api/laptop/${id}`),
            params: {
                token: "23bf880685353b8b80913bfa7e38c4bf",

            },
    }).then(res =>{
        dispatch(fetchLaptopDetailAction(res.data.data))
    }).catch(err =>{
        console.log(err);
    })
 }
} */
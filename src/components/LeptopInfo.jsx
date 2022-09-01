import React,{ useEffect} from 'react'
import Cookies from 'js-cookie';
import { useState } from 'react';
const LeptopInfo = () => {
const {data, setData} = useState([])
    useEffect(() =>{
        const info = JSON.parse(Cookies.get("employeeInfo"))
        setData(info)
        },[])

        const handlerSubmit = () => {
const name = data.name
const surname = data.lastName
const team_id = 2
const position_id  =3 
const phone_number = +995571249763
const email = data.email
const token = "778994d3e8b154213ad1e89cf47aed5e"
const laptop_name  ="Asus"
const laptop_image  = "https://i.picsum.photos/id/566/200/300.jpg?hmac=gDpaVMLNupk7AufUDLFHttohsJ9-C17P7L-QKsVgUQU"
const laptop_brand_id  = 2222
const laptop_cpu = "intel5"
const laptop_cpu_cores = 6
const laptop_cpu_threads = 12
const laptop_ram = 16
const laptop_hard_drive_type = "type"
const laptop_state  = "american"
const laptop_price = 1450


        }

  return (
    
    <button onClick={handlerSubmit}>Submit</button>
  )
}

export default LeptopInfo
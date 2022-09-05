import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import {Link} from "react-router-dom"

import {Button} from "../components/index"


const Home = () => {


  //if you return home page your information will cleared
  
  useEffect(() =>{
    Cookies.remove("employeeInfo")
        Cookies.remove("leptopInfo")
  },[])


  return (
    <div className='container d-flex h-100 ps-3 pe-3 align-center flex-column homepage' >
      <div className="text-center m-auto">
        <img src="LOGO-02 1.png" alt="" />
      </div>
      <div className="text-center HomeImageforPc">
      <img className='HomeImage ' src="homeimg.png"  alt="Home page image" />
      </div>
      <div className="text-center HomeImageforMobile">
      <img className='HomeImage ' src="Group.png"  alt="Home page image" />
      </div>
      <div className='m-auto w-100'>
        <div className='text-center w-100'>
          <Link to="Info/employeeInfo">
      <Button text="ჩანაწერის დამატება"  width="387px"/>
      </Link>
      </div>
      <div className='text-center mt-3'>
      <Link to="/laptops">
      <Button text="ჩანაწერების სია"   width="387px"/>
      </Link>
      </div>
      </div>
    </div>
  )
}

export default Home
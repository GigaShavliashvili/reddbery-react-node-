import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import {Link} from "react-router-dom"
import {Button} from "../components/Buttons"


const Home = () => {

 
    
    const doit = () => {
      console.log("onPress");
    }
  return (
    <div className='container d-flex h-100  align-center flex-column homepage' >
      <div className="text-center m-auto">
        <img src="LOGO-02 1.png" alt="" />
      </div>
      <div className="text-center ">
      <img className='img-fluid ' src="homeimg.png"  alt="Home page image" />
      </div>
      <div className='m-auto w-100'>
        <div className='text-center w-100'>
          <Link to="Info/employeeInfo">
      <Button text="ჩანაწერის დამატება"   press={doit} width="387px"/>
      </Link>
      </div>
      <div className='text-center mt-3'>
      <Link to="/leptops">
      <Button text="ჩანაწერების სია"  press={doit} width="387px"/>
      </Link>
      </div>
      </div>
    </div>
  )
}

export default Home
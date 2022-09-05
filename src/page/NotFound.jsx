import React from 'react'

import {Link} from "react-router-dom"

import  {Button}  from '../components/index'

const NotFound = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
    <div className="text-center row">
        <div className=" col-md-6">
            <img src="404.png" alt=""   className="img-fluid"/>
        </div>
        <div className=" col-md-6 mt-5 d-flex flex-column justify-content-center align-items-center" >
            <p className="fs-3"> <span className="text-danger">Opps!</span> გვერდი არ მოიძებნა!</p>
            <p className="lead">
               გვერდს რომელსაც თქვენ ეძებთ არ არსებობს....
            </p> 
            <Link to="/" className='w-100'>
           <Button text="მთავარი" width={"200px"}/>
           </Link>
        </div>

    </div>
</div>
  )
}

export default NotFound
import React from 'react'
import {Link} from "react-router-dom"
const GetBackButton = ({link}) => {
  return (
    <Link to={`/${link}`}>
    <button className='getBack'>
             <img src="/arrow.png" alt="" />
    </button>
    </Link>
  )
}

export default GetBackButton
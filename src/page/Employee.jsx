import React from 'react'
import { ButtonWithoutBg } from '../components/Buttons'
import EmployeeInfo from "../components/EmployeeInfo"
import LeptopInfo from '../components/LeptopInfo'
import { useParams, } from 'react-router-dom'

const Employee = () => {

  const {category} = useParams()

  return (
    <div className='container infocont__wrapper h-100 d-flex flex-column justify-content-around' >
    <div className='d-flex justify-content-center w-100 gap-4'>
            <ButtonWithoutBg text="თანამშრომლების ინფო"/>
            <ButtonWithoutBg text="ლეპტოპების მახასიეთებლები"/>
    </div>
    {category === "employeeInfo" && <EmployeeInfo/>}
    {category === "leptopInfo" && <LeptopInfo/>}
    
  
    </div>
  ) 
}

export default Employee
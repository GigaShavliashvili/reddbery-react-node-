import React from 'react'
import { ButtonWithoutBg } from '../components/Buttons'
import EmployeeInfo from "../components/EmployeeInfo"
const Employee = () => {
  return (
    <div className='container infocont__wrapper h-100 d-flex flex-column justify-content-around' >
    <div className='d-flex justify-content-center gap-4'>
            <ButtonWithoutBg text="თანამშრომლების ინფო"/>
            <ButtonWithoutBg text="ლეპტოპების მახასიეთებლები"/>
    </div>
         <EmployeeInfo/>
    </div>
  )
}

export default Employee
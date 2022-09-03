import React, { useEffect } from 'react'
import { ButtonWithoutBg } from '../components/Buttons'
import EmployeeInfo from "../components/EmployeeInfo"
import LeptopInfo from '../components/LeptopInfo'
import { useParams, useLocation } from 'react-router-dom'
import RedberrLogo from '../components/RedberrLogo'

const Employee = () => {

  const { category } = useParams()

  /*   useEffect(() =>{
  const responsive = window.addEventListener('resize', (e) => {
  console.log(e);
  })
    },[]) */

  return (
    <div className='infocont__wrapper h-100 d-flex flex-column ' >
      <div className='d-flex justify-content-center w-100  mt-4 mb-3'>
        <div className='forPc  justify-content-center gap-5'>
          <ButtonWithoutBg text="თანამშრომლების ინფო" active={category === "employeeInfo" ? true : false} />
          <ButtonWithoutBg text="ლეპტოპების მახასიეთებლები" active={category === "leptopInfo" ? true : false} />
        </div>
        <div className="forMobile">
          {category === "employeeInfo" && <ButtonWithoutBg text="თანამშრომლების ინფო" id="1"/>}
          {category === "leptopInfo" && <ButtonWithoutBg text="ლეპტოპების მახასიეთებლები" id="2"/>}
        </div>
      </div>
      {category === "employeeInfo" && <EmployeeInfo />}
      {category === "leptopInfo" && <LeptopInfo />}
      < RedberrLogo />
    </div>
  )
}

export default Employee
import React from 'react'
import { useParams } from 'react-router-dom'

import {ButtonWithoutBg ,EmployeeInfo,LeptopInfo,RedberrLogo} from '../components/index'

const  Information = () => {

  const { category } = useParams()


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

export default Information
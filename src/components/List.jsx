import React from 'react'

const List = ({title, info}) => {

  return (
    <div className="row align-items-center p-3 h-100" >
          <div className='col-5'>
            {
                title.map((el,index) => {
                    return <p className='fw-bold'style={{color:"#2E2E2E"}} key={index}>{el}:</p>
                }) 
            }
          </div>
          <div className='col-6'>
            {
               info.map((value,index) =>{
            return <p style={{color:'#797979'}} key={index}>{value}</p>
                })
            }
          </div>
    </div>
  )
}

export default List
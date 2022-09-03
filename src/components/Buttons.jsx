import React from 'react'

export const Button = ({text, press, width}) => {
  return (
   <button className={`border-0 w-100  text-light   pt-3 pb-3 rounded-1 `}  style={{backgroundColor:"#62A1EB", maxWidth:width, }} onClick={press}>{text}</button>
  )
}

export const ButtonWithoutBg = ({text, press, active,id }) => { 
  return <div children="w-100">
    <button className={`fw-bold text-dark pt-3 pb-3 `}  style={{background:"none", borderTop:"none", borderLeft:"none" ,borderRight:"none" ,borderBottom: active?"2px solid black" : "none"}} onClick={press}
>{text}</button>
<p className="text-center" style={{color:"#898989"}}>{id ? `${id}/2`: null}</p>
</div>
}

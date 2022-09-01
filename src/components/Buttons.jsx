import React from 'react'

export const Button = ({text, press, width}) => {
  return (
   <button className={`border-0 w-100  text-light   pt-3 pb-3 rounded-1 `}  style={{backgroundColor:"#62A1EB", maxWidth:width, }} onClick={press}>{text}</button>
  )
}

export const ButtonWithoutBg = ({text, press }) => { 
  return (
    <button className={`border-0 fw-bold  text-dark   pt-3 pb-3 `}  style={{background:"none",  }} onClick={press}
>{text}</button>
   )
}

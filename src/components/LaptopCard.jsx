import React from 'react'
import {Link} from "react-router-dom"
import { baseUrl } from '../configs/api'
const LaptopCard = ({item}) => {
  return (
<div
                className="col-md-5  col-12 d-flex rounded-4  LeptopCard"
                style={{ maxWidth: "563px", backgroundColor:"#EAFAFF", border:"1px solid #AED1EA" }}
              >
                <div className="LeptopListImage">
                  <img
                    src={baseUrl(item.laptop.image)}
                    alt={item.laptop.name}
                  />
                </div>
                <div className="ms-4 d-flex flex-column justify-content-around pt-1 pb-4"> 
                <p className="fw-bold ">{item.user.name} {item.user.surname}</p>
                <p className="fw-4 ">{item.laptop.name}</p>
                <Link className="" to={`/leptopDetails/${item.laptop.id}`}>მეტის ნახვა</Link>
                </div>
              </div>
  )
}

export default LaptopCard
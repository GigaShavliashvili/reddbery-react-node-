import React from 'react'
import {Link} from "react-router-dom"
import { baseUrl } from '../configs/api'
const LaptopCard = ({item}) => {
  return (
<div
                className="col-md-5 col-12 d-flex p-4 rounded-4 mt-5"
                style={{ maxWidth: "563px", backgroundColor:"#EAFAFF", border:"1px solid #AED1EA" }}
              >
                <div>
                  <img
                    src={baseUrl(item.laptop.image)}
                    alt={item.laptop.name}
                    style={{maxWidth:"266px"}}
                    className="img-fluid"
                  />
                </div>
                <div className="ms-4 d-flex flex-column "> 
                <p className="fw-bold mt-2">{item.user.name} {item.user.surname}</p>
                <p className="fw-4 mt-1">{item.laptop.name}</p>
                <Link className="mt-4" to={`/leptopDetails/${item.laptop.id}`}>მეტის ნახვა</Link>
                </div>
              </div>
  )
}

export default LaptopCard
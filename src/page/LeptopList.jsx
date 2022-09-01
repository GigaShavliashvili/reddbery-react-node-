import React, { useEffect, useState } from "react";
import axios from "axios";
import { ButtonWithoutBg } from "../components/Buttons";
import {Link} from "react-router-dom"
const LeptopList = () => {
  const [leptopList, setLepotopList] = useState([]);

  const fetchLeptopData = () => {
    axios({
      url: "https://pcfy.redberryinternship.ge/api/laptops",
      method: "GET",
      params: {
        token: "23bf880685353b8b80913bfa7e38c4bf",
      },
    })
      .then((res) => {
        setLepotopList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchLeptopData();
  }, []);

  console.log(leptopList);
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="text-center">
        <ButtonWithoutBg text="ჩანაწერების სია" />
      </div>

      <div className="row justify-content-around ">
        {leptopList.length > 0 ? (
          leptopList.map((item) => {
            return (
              <div
                className="col-md-5 col-12 d-flex p-4 rounded-4 mt-5"
                key={item.laptop.id}
                style={{ maxWidth: "563px", backgroundColor:"#EAFAFF", border:"1px solid #AED1EA" }}
              >
                <div>
                  <img
                    src={`https://pcfy.redberryinternship.ge${item.laptop.image}`}
                    alt={item.laptop.name}
                    style={{maxWidth:"266px"}}
                    className="img-fluid"
                  />
                </div>
                <div className="ms-4 d-flex flex-column "> 
                <p className="fw-bold mt-2">{item.user.name} {item.user.surname}</p>
                <p className="fw-4 mt-1">{item.laptop.name}</p>
                <Link className="mt-4" to="/">მეტის ნახვა</Link>
                </div>
              </div>
            );
          })
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default LeptopList;

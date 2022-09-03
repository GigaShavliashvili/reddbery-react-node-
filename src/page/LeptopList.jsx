import React, { useEffect, useState } from "react";
import axios from "axios";
import { ButtonWithoutBg } from "../components/Buttons";
import {Link} from "react-router-dom"
import LaptopCard from "../components/LaptopCard";
import PageHeader from "../components/PageHeader";
import { baseUrl } from "../configs/api";
const LeptopList = () => {
  const [leptopList, setLepotopList] = useState([]);

  const fetchLeptopData = () => {
    axios({
      url:baseUrl("/api/laptops"),
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

        <PageHeader text="ჩანაწერების სია" />

      <div className="row justify-content-around leptopList-wrapper">
        {leptopList.length > 0 ? (
          leptopList.map((item) => {
            return (
              <LaptopCard key={item.laptop.id} item={item}/>
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

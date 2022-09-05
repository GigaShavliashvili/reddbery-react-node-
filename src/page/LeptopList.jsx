import React, { useEffect } from "react";

import { fetchLaptopListData } from "../fetchData/fetchLaptopData";

import { useSelector,useDispatch } from "react-redux";

import {LaptopCard,PageHeader,GetBackButton} from "../components/index"


const LeptopList = () => {
const dispatch = useDispatch()

const  leptopList = useSelector(state => state.laptopData.laptopList)

  useEffect(() => {
    dispatch(fetchLaptopListData())
  }, []);


  return (
    <div className="ps-2 pe-2" >
        <GetBackButton link=""/>
        <PageHeader text="ჩანაწერების სია" />

      <div className="row justify-content-around leptopList-wrapper">
        {leptopList.length > 0 ? (
          leptopList.map((item) => {
            return (
              <LaptopCard key={item.laptop.id} item={item}/>
            );
          })
        ) : (
          <h1 className="mt-5 text-center">Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default LeptopList;

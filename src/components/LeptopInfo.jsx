import React, { useEffect, useState,useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useDropzone} from 'react-dropzone'
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { fetchBrandsData, fetchCpusData } from "../fetchData/fetchGeneralData";

import { Button, GetBackButton } from "../components/index";

const LeptopInfo = () => {
  const [employeeInfo, setEmployeeInfo] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [memoryType, setMemoryType] = useState(null);
  const [condition, setCondition] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm({});

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // laptop brand and cpus from redux
  const { brand, cpus } = useSelector((state) => state.generalData);

  useEffect(() => {
    dispatch(fetchBrandsData());
    dispatch(fetchCpusData());
  }, []);

  //this observed your inputs and save information, after reload your infromation dont cleared
  useEffect(() => {
    const subscription = watch((value) => {
      Cookies.set("leptopInfo", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const leptopInfo = Cookies.get("leptopInfo")
      ? JSON.parse(Cookies.get("leptopInfo"))
      : null;
    if (leptopInfo) {
      setValue(`leptopName`, leptopInfo.leptopName);
      setValue(`cpuCore`, leptopInfo.cpuCore);
      setValue(`cpuFlow`, leptopInfo.cpuFlow);
      setValue(`leoptopRam`, leptopInfo.leoptopRam);
      setValue("purchaseDate", leptopInfo.purchaseDate);
      setValue("leptopPrice", leptopInfo.leptopPrice);
      console.log(leptopInfo);
    }
  }, []);

  useEffect(() => {
    const employeeInfo = Cookies.get("employeeInfo")
      ? JSON.parse(Cookies.get("employeeInfo"))
      : null;
    if (employeeInfo) {
      setEmployeeInfo(employeeInfo);
      //If  user has not filled employeeInfo, he navigate to employeeinfo page
    } else navigate("/info/employeeInfo");
  }, []);

//this for droped imagee
  const onDrop = useCallback(acceptedFiles => {

    if (acceptedFiles[0].size > 1000000) {
      window.alert("ფოტოს არ უნდა იყოს 1MB_ზე მეტი");
    } else
    {
      setSelectedImage(acceptedFiles[0]);
      console.log(acceptedFiles[0]);
    }  
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,noClick: true})

  const submitHandler = ({
    cpuCore,
    cpuFlow,
    leoptopRam,
    leptopName,
    leptopPrice,
    CPU,
    brand,
    purchaseDate,
  }) => {
    const data = {
      name: employeeInfo.name,
      surname: employeeInfo.lastName,
      team_id: employeeInfo.team,
      position_id: employeeInfo.possition,
      phone_number: employeeInfo.phoneNumber,
      email: employeeInfo.email,
      token: process.env.REACT_APP_API_TOKEN,
      laptop_name: leptopName,
      laptop_image: selectedImage,
      laptop_brand_id: brand,
      laptop_cpu: CPU,
      laptop_cpu_cores: cpuCore,
      laptop_cpu_threads: cpuFlow,
      laptop_ram: leoptopRam,
      laptop_hard_drive_type: memoryType,
      laptop_state: condition,
      laptop_price: leptopPrice,
      laptop_purchase_date: purchaseDate,
    };

    axios({
      method: "POST",
      url: "https://pcfy.redberryinternship.ge/api/laptop/create",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        Cookies.remove("employeeInfo");
        Cookies.remove("leptopInfo");
        setSuccess(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (success) {
    return (
      <div className="success-wrapper">
        <div className="success">
          <img src="/Frame.png" alt="succes img" />
          <h5>ჩანაწერი დამატებულია</h5>
          <Link to="/laptops" className="text-center w-100">
            <Button text="სიაში გდაყვანა" width="287px" />
          </Link>
          <Link className="mt-4" style={{ color: "#62A1EB" }} to="/">
            მთავარი
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-4 h-100 mb-4 info-wrapper">
      <GetBackButton link="info/employeeInfo" />
      <form
        className="h-100"
        action="submit"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="d-flex flex-column h-100 w-100 justify-content-between ">
          <div className="row">
            {/* imageeee uploader*/}
            <div
              className="d-flex justify-content-center align-center mb-5 p-0"
              style={
                errors.exampleRequired && !selectedImage
                  ? { background: "rgba(255, 0, 0, 0.103)" }
                  : {}
              }
            >
              {!selectedImage ? (
                <div className="upload-wrapper" {...getRootProps()}>
                  <label
                    className="border-0  text-light text-center pt-3 pb-3 rounded-1 custom-file-uploadforMobile"
                    htmlFor="file-upload"
                  >
                    <img src="/Upload.png" alt="" />
                  </label>
                  {errors.exampleRequired && (
                    <div className="upload-error">
                      <img src="/Vector.png" alt="error icon" />
                    </div>
                  )}
                  <p
                    className="upload-text"
                    style={errors.exampleRequired && { color: "red" }}
                  >
                    ჩააგდეთ ან ატვირთეთ ლეპტოპის ფოტო
                  </p>
     
                  <label
                    className="border-0  text-light text-center pt-3 pb-3 rounded-1 custom-file-upload"
                    htmlFor="file-upload"
                  >
                    ატვირთე
                  </label>
                  <input
                  {...getInputProps()}
                    {...register("exampleRequired", { required: true })}
                    className="uploadInput"
                    type="file"
                    id="file-upload"
                    name="myImage"
                    onChange={(e) => {
                      if (e.target.files[0].size > 1000000) {
                        window.alert("ფოტოს არ უნდა იყოს 1MB_ზე მეტი");
                      } else setSelectedImage(e.target.files[0]);
                      console.log(e.target.files[0]);
                    }}
                  />
                </div>
              ) : (
                <div className="w-100 d-flex flex-column align-items-center">
                  <div className="imageFit">
                    <img
                      alt="not fount"
                      src={URL.createObjectURL(selectedImage)}
                    />
                  </div>
                  <div className="w-100 mt-4">
                    <div className="mt-3 d-flex justify-content-between gap-3 w-100">
                      <div className="d-flex align-items-center ">
                        <img src="/SuccessUpload.png" className="" alt="" />
                        <div className="row ">
                          <span className="ms-2 col-md-5 col-12">
                            {selectedImage.name.slice(0, 10)}...
                          </span>
                          <span
                            className="col-md-5 col-12 ms-3"
                            style={{ color: "gray", fontSize: "14px" }}
                          >
                            {Math.ceil(selectedImage.size / 1000000)} mb
                          </span>
                        </div>
                      </div>
                      <Button
                        text="თავიდან ატვირთვა"
                        width={"233px"}
                        press={() => setSelectedImage(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/*Leptop Name */}
            <div
              className={`col-12 col-md-6 input-error ${
                errors.leptopName ? "active" : ""
              }`}
            >
              <label htmlFor="">ლეპტოპის სახელი</label>

              <input
                style={{ width: "100%" }}
                id="leptopName"
                {...register("leptopName", {
                  required: true,
                  pattern: /^[A-ZA-A]/,
                })}
              />
              <span>
                {errors.leptopName
                  ? errors.leptopName.type === "pattern"
                    ? "გამოიყენეთ ლათინური  ასობეი"
                    : "მიუთითეთ ლეპტოპის სახელი"
                  : "ლათინური ასოები, ციფრები, !@#$%^&*()_+= "}
              </span>
            </div>

            {/* select Leptop Brand */}
            <div className="col-12 col-md-6 mt-1 ">
              <div className="h-100 pt-4 pb-4">
                <select
                  name="brand"
                  style={
                    errors.brand
                      ? { border: "1px solid red", outline: "none" }
                      : undefined
                  }
                  {...register("brand", { required: true })}
                >
                  <option value="">ლეპტოპის ბრენდი</option>
                  {brand?.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <span className="line"></span>

          <div className="row">
            {/* select your CPU */}
            <div className="col-12 col-md-4 mt-1 mt-4">
              <div className="h-100 pt-4 pb-4">
                <select
                  name="CPU"
                  style={
                    errors.CPU
                      ? { border: "1px solid red", outline: "none" }
                      : undefined
                  }
                  {...register("CPU", { required: true })}
                >
                  <option value="">CPU</option>
                  {cpus?.map((el) => (
                    <option key={el.id} value={el.name}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/*CPU Core */}
            <div
              className={`col-12 col-md-4 mt-4 input-error ${
                errors.cpuCore ? "active" : ""
              }`}
            >
              <label htmlFor="">CPU ბირთვი</label>
              <input
                style={{ width: "100%" }}
                id="cpuCore"
                defaultValue=""
                {...register("cpuCore", {
                  required: true,
                  maxLength: 12,
                  minLength: 1,
                  pattern: /[0-9]/,
                })}
              />
              <span>
                {errors.cpuCore
                  ? errors.cpuCore.type === "pattern"
                    ? "გამოიყენეთ მხოლოთ ციფრები"
                    : "მიუთითეთ პროცესორის ბირთვების რაოდენობა"
                  : "მხოლოდ ციფრები"}
              </span>
            </div>

            {/*CPU Flow */}
            <div
              className={`col-12 col-md-4 mt-4 input-error ${
                errors.cpuFlow ? "active" : ""
              }`}
            >
              <label htmlFor="">CPU ნაკადი</label>
              <input
                style={{ width: "100%" }}
                id="cpuFlow"
                {...register("cpuFlow", {
                  required: true,

                  pattern: /[0-9]/,
                })}
              />
              <span>
                {errors.cpuFlow
                  ? errors.cpuFlow.type === "pattern"
                    ? "გამოიყენეთ მხოლოთ ციფრები"
                    : "მიუთითეთ პროცესორის ნაკადი"
                  : "მხოლოდ ციფრები"}
              </span>
            </div>

            {/*  Leptop RAM */}
            <div
              className={`col-12 col-md-6 mt-4 input-error ${
                errors.leoptopRam ? "active" : ""
              }`}
            >
              <label htmlFor="">ლეპტოპის RAM (GB)</label>
              <input
                style={{ width: "100%" }}
                id="leoptopRam"
                defaultValue=""
                {...register("leoptopRam", {
                  required: true,
                  pattern: /[0-9]/,
                })}
              />
              <span>
                {errors.leptopRam
                  ? errors.leptopRam.type === "pattern"
                    ? "გამოიყენეთ მხოლოთ ციფრები"
                    : "მიუთითეთ მეხსიერება"
                  : "მხოლოდ ციფრები"}
              </span>
            </div>
            {/*   Memory type */}
            <div className="col-12 col-md-4 mt-4">
              <label htmlFor="" style={errors.memoryType && { color: "red" }}>
                მეხსიერების ტიპი{" "}
                {errors.memoryType && (
                  <img
                    src="/Vector.png"
                    alt="error icon"
                    className="error-img"
                  />
                )}
              </label>
              <div className="d-flex justify-content-around mt-3">
                <div className="form-check">
                  <label htmlFor="flexRadioDefault1">
                    <input
                      {...register("memoryType", { required: true })}
                      type="radio"
                      onChange={(e) => setMemoryType(e.target.value)}
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value="SSD"
                      className="form-check-input"
                    />{" "}
                    SSD
                  </label>
                </div>
                <div className="form-check">
                  <label htmlFor="flexRadioDefault2">
                    <input
                      {...register("memoryType", { required: true })}
                      type="radio"
                      value="HDD"
                      onChange={(e) => setMemoryType(e.target.value)}
                      className="form-check-input"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                    />{" "}
                    HDD
                  </label>
                </div>
              </div>
            </div>

            <span className="line"></span>

            {/*  Pirchase Date */}
            <div
              className={`col-12 col-md-6 mt-4 input-error ${
                errors.purchaseDate ? "active" : ""
              }`}
            >
              <label htmlFor="">შეძენის რიცხვი (არჩევით)</label>
              <input
                style={{ width: "100%" }}
                id="purchaseDate"
                defaultValue=""
                placeholder="წწ - თთ - დდ"
                {...register("purchaseDate", {
                  required: false,
                  pattern:
                    /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
                })}
              />
              <span>
                {errors.purchaseDate
                  ? errors.purchaseDate.type === "pattern"
                    ? "მიუთითეთ სწორ ფორმატში"
                    : "მიუთითეთ თარიღი"
                  : "მიუთითეთ სწორ ფორმატში"}
              </span>
            </div>

            {/*  Leptop  Price */}
            <div
              className={`col-12 col-md-6 mt-4 input-error ${
                errors.leptopPrice ? "active" : ""
              }`}
            >
              <label htmlFor="">ლეპტოპის ფასი</label>
              <input
                style={{ width: "100%" }}
                id="leptopPrice"
                {...register("leptopPrice", {
                  required: true,
                  pattern: /[0-9]/,
                })}
              />
              <span>
                {errors.leptopPrice
                  ? errors.leptopPrice.type === "pattern"
                    ? "გამოიყენეთ მხოლოთ ციფრები"
                    : "მიუთითეთ ფასი"
                  : "მხოლოდ ციფრები"}
              </span>
            </div>

            {/* leptop copndition */}
            <div className="col-12 col-md-4 mt-4">
              <label htmlFor="" style={errors.condition && { color: "red" }}>
                ლეპტოპის მდგომარეობა
                {errors.condition && (
                  <img
                    src="/Vector.png"
                    alt="error icon"
                    className="error-img"
                  />
                )}{" "}
              </label>
              <div className="d-flex justify-content-around mt-3">
                <div className="form-check">
                  <label htmlFor="flexRadioDefault3">
                    <input
                      {...register("condition", { required: true })}
                      type="radio"
                      onChange={(e) => setCondition(e.target.value)}
                      name="flexRadioDefault2"
                      id="flexRadioDefault3"
                      value="new"
                      className="form-check-input"
                    />{" "}
                    ახალი
                  </label>
                </div>
                <div className="form-check">
                  <label htmlFor="flexRadioDefault4">
                    <input
                      {...register("condition", { required: true })}
                      type="radio"
                      value="used"
                      onChange={(e) => setCondition(e.target.value)}
                      className="form-check-input"
                      name="flexRadioDefault2"
                      id="flexRadioDefault4"
                    />{" "}
                    მეორადი
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex mt-4 justify-content-between align-items-center">
            <Link style={{ color: "#62A1EB" }} to="/info/employeeInfo">
              უკან
            </Link>
            <Button text="შემდეგი" width="174px" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LeptopInfo;

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "./Buttons";
import { Link } from "react-router-dom"
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import { fetchBrandsData, fetchCpusData } from "../fetchData/fetchGeneralData";
const LeptopInfo = () => {
  const [employeeInfo, setEmployeeInfo] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [memoryType, setMemoryType] = useState(null);
  const [condition, setCondition] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const { brand, cpus } = useSelector((state) => state.generalData)

  console.log(brand);
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm({});

console.log();

  useEffect(() => {
    dispatch(fetchBrandsData())
    dispatch(fetchCpusData())
  }, [])



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
      token: "23bf880685353b8b80913bfa7e38c4bf",
      laptop_name: leptopName,
      laptop_image: selectedImage,
      laptop_brand_id: brand,
      laptop_cpu: CPU,
      laptop_cpu_cores: cpuCore,
      laptop_cpu_threads: cpuFlow,
      laptop_ram:leoptopRam,
      laptop_hard_drive_type:  memoryType,
      laptop_state: condition,
      laptop_price: leptopPrice,
      laptop_purchase_date:  purchaseDate,
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
        Cookies.remove("employeeInfo")
        Cookies.remove("leptopInfo")
        setSuccess(true)
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      }); 
  };


  if (success) {
    return <div className="success-wrapper" >
      <div className="success">
        <img src="/Frame.png" alt="succes img" />
        <h5>ჩანაწერი დამატებულია</h5>
        <Link to="/">
          <Button width="297px" text="სიაში გდაყვანა" />
        </Link>
        <Link className="mt-4" style={{ color: "#62A1EB" }} to="/">მთავარი</Link>
      </div>
    </div>
  }

  return (
    <div
      className="rounded-4 h-100 mb-4 info-wrapper"
      style={{ backgroundColor: "white", borderRadius: "18px" }}
    >
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
                <div className="upload-wrapper">
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
                    {...register("exampleRequired", { required: true })}
                    className="uploadInput"
                    type="file"
                    id="file-upload"
                    name="myImage"
                    onChange={(e) => {
                      /*   uploadImage(e) */
                      setSelectedImage(e.target.files[0]);
                    }}
                  />
                </div>
              ) : (
                <div>
                  <img
                    alt="not fount"
                    className="img-fluid "
                    src={URL.createObjectURL(selectedImage)}
                  /*     src={selectedImage}  */
                  />
                  <div className="d-flex w-100 justify-content-end">
                    <div className="mt-3 w-100" style={{ maxWidth: "233px" }}>
                      <Button
                        text="თავიდან ატვირთვა"
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

            <div className="col-12 col-md-6">
              <label htmlFor="">ლეპტოპის სახელი</label>
              <Controller
                name="leptopName"
                control={control}
                rules={{
                  required: true,
                  pattern: /^[A-ZA-A]/,
                }}
                render={({ field }) => (
                  <TextField
                    style={{ width: "100%" }}
                    id="leptopName"
                    defaultValue=""
                    sx={{
                      "& legend": { display: "none" },
                      "& fieldset": { top: 0, border: "2px solid #8AC0E2" },
                    }}
                    inputProps={{ type: "leptopName" }}
                    error={Boolean(errors.leptopName)}
                    helperText={
                      errors.leptopName
                        ? errors.leptopName.type === "pattern"
                          ? "გამოიყენეთ ლათინური  ასობეი"
                          : "მიუთითეთ ლეპტოპის სახელი"
                        : "ლათინური ასოები, ციფრები, !@#$%^&*()_+= "
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </div>

            {/* select Leptop Brand */}
            <div className="col-12 col-md-6 mt-1 ">
              <div className="h-100 pt-4 pb-4">
                <Controller
                  name="brand"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <select
                      name="brand"
                      {...field}
                    >
                      <option value="">ლეპტოპის ბრენდი</option>
                      {brand?.map((el) => (
                        <option key={el.id} value={el.id} >
                          {el.name}
                        </option>))}
                    </select>
                  )}
                />
              </div>
            </div>
          </div>

          <span className="line"></span>

          <div className="row">
            {/* select your CPU */}
            <div className="col-12 col-md-4 mt-1 mt-4">
              <div className="h-100 pt-4 pb-4">
                <Controller
                  name="CPU"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <select
                      name="CPU"
                      {...field}
                    >
                      <option value="">CPU</option>
                      {cpus?.map((el) => (
                        <option key={el.id} value={el.name} >
                          {el.name}
                        </option>))}
                    </select>
                  )}
                />
              </div>
            </div>
            {/*CPU Core */}
            <div className="col-12 col-md-4 mt-4">
              <label htmlFor="">CPU ბირთვი</label>
              <Controller
                name="cpuCore"
                control={control}
                rules={{
                  required: true,
                  maxLength: 12,
                  minLength: 1,
                  pattern: /[0-9]/,
                }}
                render={({ field }) => (
                  <TextField
                    style={{ width: "100%" }}
                    id="cpuCore"
                    defaultValue=""
                    sx={{
                      "& legend": { display: "none" },
                      "& fieldset": { top: 0, border: "2px solid #8AC0E2" },
                    }}
                    inputProps={{ type: "cpuCore" }}
                    error={Boolean(errors.cpuCore)}
                    helperText={
                      errors.cpuCore
                        ? errors.cpuCore.type === "pattern"
                          ? "გამოიყენეთ მხოლოთ ციფრები"
                          : "მიუთითეთ პროცესორის ბირთვების რაოდენობა"
                        : "მხოლოდ ციფრები"
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </div>
            {/*CPU Flow */}
            <div className="col-12 col-md-4 mt-4">
              <label htmlFor="">CPU ნაკადი</label>
              <Controller
                name="cpuFlow"
                control={control}
                rules={{
                  required: true,

                  pattern: /[0-9]/,
                }}
                render={({ field }) => (
                  <TextField
                    style={{ width: "100%" }}
                    id="cpuFlow"
                    defaultValue=""
                    sx={{
                      "& legend": { display: "none" },
                      "& fieldset": { top: 0, border: "2px solid #8AC0E2" },
                    }}
                    inputProps={{ type: "cpuFlow" }}
                    error={Boolean(errors.cpuFlow)}
                    helperText={
                      errors.cpuFlow
                        ? errors.cpuFlow.type === "pattern"
                          ? "გამოიყენეთ მხოლოთ ციფრები"
                          : "მიუთითეთ პროცესორის ნაკადი"
                        : "მხოლოდ ციფრები"
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </div>
            {/*  Leptop RAM */}
            <div className="col-12 col-md-6 mt-4">
              <label htmlFor="">ლეპტოპის RAM (GB)</label>
              <Controller
                name="leoptopRam"
                control={control}
                rules={{
                  required: true,
                  pattern: /[0-9]/,
                }}
                render={({ field }) => (
                  <TextField
                    style={{ width: "100%" }}
                    id="leoptopRam"
                    defaultValue=""
                    sx={{
                      "& legend": { display: "none" },
                      "& fieldset": { top: 0, border: "2px solid #8AC0E2" },
                    }}
                    inputProps={{ type: "name" }}
                    error={Boolean(errors.leoptopRam)}
                    helperText={
                      errors.leptopRam
                        ? errors.leptopRam.type === "pattern"
                          ? "გამოიყენეთ მხოლოთ ციფრები"
                          : "მიუთითეთ მეხსიერება"
                        : "მხოლოდ ციფრები"
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </div>
            {/*   Memory type */}
            <div className="col-12 col-md-4 mt-4">
              <label htmlFor="" style={errors.memoryType&& { color: "red" }}>მეხსიერების ტიპი  {errors.memoryType&& <img src="/Vector.png" alt="error icon" className="error-img" />}</label>
              <div className="d-flex justify-content-around mt-3">
                <div className="form-check">
                  <label htmlFor="flexRadioDefault1" >
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
                  <label htmlFor="flexRadioDefault2" >
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
            <div className="col-12 col-md-6 mt-4">
              <label htmlFor="">შეძენის რიცხვი (არჩევით)</label>
              <Controller
                name="purchaseDate"
                control={control}
                rules={{
                  required: false,
                  pattern: /[0-31]+[0-12]+[0-2023]/,
                }}
                render={({ field }) => (
                  <TextField
                    style={{ width: "100%" }}
                    id="purchaseDate"
                    defaultValue=""
                    placeholder="დდ/ თთ / წწ"
                    sx={{
                      "& legend": { display: "none" },
                      "& fieldset": { top: 0, border: "2px solid #8AC0E2" },
                    }}
                    inputProps={{ type: "date" }}
                    error={Boolean(errors.purchaseDate)}
                    helperText={
                      errors.purchaseDate
                        ? errors.purchaseDate.type === "pattern"
                          ? "მიუთითეთ სწორ ფორმატში"
                          : "მიუთითეთ თარიღი"
                        : "მიუთითეთ სწორ ფორმატში"
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </div>

            {/*  Leptop  Price */}
            <div className="col-12 col-md-6 mt-4">
              <label htmlFor="">ლეპტოპის ფასი</label>
              <Controller
                name="leptopPrice"
                control={control}
                rules={{
                  required: true,
                  pattern: /[0-9]/,
                }}
                render={({ field }) => (
                  <TextField
                    style={{ width: "100%" }}
                    id="leptopPrice"
                    defaultValue="00000"
                    sx={{
                      "& legend": { display: "none" },
                      "& fieldset": { top: 0, border: "2px solid #8AC0E2" },
                    }}
                    inputProps={{ type: "number" }}
                    error={Boolean(errors.leptopPrice)}
                    helperText={
                      errors.leptopPrice
                        ? errors.leptopPrice.type === "pattern"
                          ? "გამოიყენეთ მხოლოთ ციფრები"
                          : "მიუთითეთ ფასი"
                        : "მხოლოდ ციფრები"
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </div>

        {/* leptop copndition */}
            <div className="col-12 col-md-4 mt-4">
              <label htmlFor="" style={errors.condition && { color: "red" }}>ლეპტოპის მდგომარეობა 
              {errors.condition && <img src="/Vector.png" alt="error icon" className="error-img" />} </label>
              <div className="d-flex justify-content-around mt-3">
                <div className="form-check">
                  <label htmlFor="flexRadioDefault3" >
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

          <div className="d-flex mt-4 justify-content-end">
            <Button text="შემდეგი" width="174px" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LeptopInfo;

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "./Buttons";
import {Link} from "react-router-dom"
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useNavigate } from "react-router";
import axios from "axios";

const LeptopInfo = () => {
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadError, setUploadError] = useState(false);
  const [memoryType, setMemoryType] = useState(null);
  const [condition, setCondition] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm({});

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
    console.log(employeeInfo);
    if (employeeInfo) {
      setData(employeeInfo);
      console.log(employeeInfo); //If  user has not filled employeeInfo, he navigate to employeeinfo page
    } else navigate("/info/employeeInfo");
  }, []);

  const submitHandler = ({
    cpuCore,
    cpuFlow,
    leoptopRam,
    leptopName,
    leptopPrice,
    purchaseDate,
  }) => {
    const data = {
      name: "გიგა",
      surname: "შავლიაშვილი",
      team_id: 1,
      position_id: 1,
      phone_number: "+995555555555",
      email: "shavliashvili33@redberry.ge",
      token: "23bf880685353b8b80913bfa7e38c4bf",
      laptop_name: "Asus",
      laptop_image: selectedImage,
      laptop_brand_id: 1,
      laptop_cpu: "Intel Core i3",
      laptop_cpu_cores: 3,
      laptop_cpu_threads: 12,
      laptop_ram: 22,
      laptop_hard_drive_type: "SSD",
      laptop_state: "new",
      laptop_price: 2000,
    };

    axios({
      method: "POST",
      url: "https://pcfy.redberryinternship.ge/api/laptop/create",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json ",
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


  if(success){
    return <div className="success-wrapper" >
      <div className="success">
        <img  src="/Frame.png"   alt="succes img" />
        <h5>ჩანაწერი დამატებულია</h5>
        <Link to="/">
        <Button width="297px" text="სიაში გდაყვანა" />
        </Link>
        <Link className="mt-4" style={{color:"#62A1EB"}} to="/">მთავარი</Link>
      </div>
    </div>
  }

  return (
    <div
      className="rounded-1 h-100 mb-5 info-wrapper"
      style={{ backgroundColor: "white", borderRadius: "18px" }}
    >
      <form
        className="h-100"
        action="submit"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="d-flex flex-column h-100 w-100 justify-content-between ">
          <div className="row">
            {/* imageeee */}
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
                      <img src="/Vector.png" alt="error icon" className="img-fluid" />
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
                    for="file-upload"
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
                defaultValue=""
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
                      "& fieldset": { top: 0 },
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

            {/* select your team */}
            <div className="col-12 col-md-6 mt-1 ">
              <div className="h-100 pt-4 pb-4">
                <Controller
                  name="team"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      required
                      name="team"
                      placeholder="ლეპტოპის ბრენდი"
                      {...field}
                      options={[
                        { value: "chocolate", label: "Chocolate" },
                        { value: "strawberry", label: "Strawberry" },
                        { value: "vanilla", label: "Vanilla" },
                      ]}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <span className="line"></span>

          <div className="row">
            {/* select your team */}
            <div className="col-12 col-md-4 mt-1 mt-4">
              <div className="h-100 pt-4 pb-4">
                <Controller
                  name="team"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      required
                      name="team"
                      placeholder="CPU"
                      {...field}
                      options={[
                        { value: "chocolate", label: "Chocolate" },
                        { value: "strawberry", label: "Strawberry" },
                        { value: "vanilla", label: "Vanilla" },
                      ]}
                    />
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
                defaultValue=""
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
                      "& fieldset": { top: 0 },
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
                defaultValue=""
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
                      "& fieldset": { top: 0 },
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
                defaultValue=""
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
                      "& fieldset": { top: 0 },
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
              <label htmlFor="">მეხსიერების ტიპი</label>
              <div className="d-flex justify-content-around mt-3">
                <div className="form-check">
                  <label htmlFor="radio" for="flexRadioDefault1">
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
                  <label htmlFor="radio2" for="flexRadioDefault2">
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
                defaultValue=""
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
                      "& fieldset": { top: 0 },
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
                defaultValue="00000"
                rules={{
                  required: true,
                  pattern: /[0-9]/,
                }}
                render={({ field }) => (
                  <TextField
                    style={{ width: "100%" }}
                    id="leptopPrice"
                    defaultValue=""
                    sx={{
                      "& legend": { display: "none" },
                      "& fieldset": { top: 0 },
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

            <div className="col-12 col-md-4 mt-4">
              <label htmlFor="">ლეპტოპის მდგომარეობა</label>
              <div className="d-flex justify-content-around mt-3">
                <div className="form-check">
                  <label htmlFor="radio3" for="flexRadioDefault3">
                    <input
                      {...register("condition", { required: true })}
                      type="radio"
                      onChange={(e) => setCondition(e.target.value)}
                      name="flexRadioDefault3"
                      id="flexRadioDefault3"
                      value="ახალი"
                      className="form-check-input"
                    />{" "}
                    ახალი
                  </label>
                </div>
                <div className="form-check">
                  <label htmlFor="radio4" for="flexRadioDefault4">
                    <input
                      {...register("condition", { required: true })}
                      type="radio"
                      value="მეორადი"
                      onChange={(e) => setCondition(e.target.value)}
                      className="form-check-input"
                      name="flexRadioDefault4"
                      id="flexRadioDefault4"
                    />{" "}
                    მეორადი
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex mt-2 justify-content-end">
            <Button text="შემდეგი" width="174px" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LeptopInfo;

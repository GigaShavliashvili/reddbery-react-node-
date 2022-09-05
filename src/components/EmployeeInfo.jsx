import React, { useEffect, useState } from "react";
import { Button } from "./Buttons";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTeamsData,
  fetchPositionData,
} from "../fetchData/fetchGeneralData";
import GetBackButton from "./GetBackButton";

const EmployeeInfo = () => {
  const [teamId, setTeamId] = useState(null);

  const {
    handleSubmit,
    control,
    setValue,
    register,
    watch,
    formState: { errors },
  } = useForm({});

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // teams and position from redux
  const { teams, position } = useSelector((state) => state.generalData);

  useEffect(() => {
    dispatch(fetchTeamsData());
    dispatch(fetchPositionData());
  }, []);

  //this observed your inputs and save information, after reload your infromation dont cleared
  useEffect(() => {
    const subscription = watch((value) => {
      Cookies.set("employeeInfo", JSON.stringify(value));
      setTeamId(value.team);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const info = Cookies.get("employeeInfo")
      ? JSON.parse(Cookies.get("employeeInfo"))
      : null;
    if (info) {
      setValue(`name`, info.name);
      setValue(`lastName`, info.lastName);
      setValue(`email`, info.email);
      setValue(`phoneNumber`, info.phoneNumber);

    }
  }, []);

  /* 
useFormPersist("", { watch, setValue }); */
  //this keep your information after reload the page

  const submitHandler = ({
    name,
    email,
    phoneNumber,
    lastName,
    possition,
    team,
  }) => {
    Cookies.set(
      "employeeInfo",
      JSON.stringify({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        lastName: lastName,
        possition: possition,
        team: team,
      })
    );
    navigate("/info/leptopInfo");
  };

  return (
    <div className="rounded-4 h-100 mb-5 info-wrapper">
      <GetBackButton link="" />
      <form
        className="h-100"
        action="submit"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="d-flex flex-column h-100 w-100 justify-content-between ">
          <div className="row">
            {/*user name */}
            <div
              className={`col-12 col-md-6 input-error ${
                errors.name ? "active" : ""
              }`}
            >
              <label htmlFor="">სახელი</label>
              <input
                style={{ width: "100%" }}
                id="name "
                {...register("name", {
                  required: true,
                  maxLength: 12,
                  minLength: 1,
                  pattern: /[ა-ზა-ზ]/gi,
                })}
              />
              <span>
                {errors.name
                  ? errors.name.type === "pattern"
                    ? "გამოიყენეთ ქართული ასოები"
                    : errors.name.type === "maxLength" ||
                      errors.name.type === "minLength"
                    ? "სახელი უნდა შეიცავდეს 2 დან 12 სიმბოლომდე."
                    : "მიუთითეთ თქვენი სახელი"
                  : "მინიმუმ 2 სიმბოლო, ქართული ასოები"}
              </span>
            </div>

            {/*lastName */}
            <div
              className={`col-12 col-md-6 input-error ${
                errors.lastName ? "active" : ""
              }`}
            >
              <label htmlFor="">გვარი</label>
              <input
                style={{ width: "100%" }}
                id="lastName"
                {...register("lastName", {
                  required: true,
                  maxLength: 12,
                  minLength: 1,
                  pattern: /[ა-ზა-ზ]/gi,
                })}
              />
              <span>
                {errors.lastName
                  ? errors.lastName.type === "pattern"
                    ? "გამოიყენეთ ქართული ასობეი"
                    : errors.lastName.type === "maxLength" ||
                      errors.lastName.type === "minLength"
                    ? "გვარი უნდა შეიცავდეს 2 დან 12 სიმბოლომდე."
                    : "მიუთითეთ თქვენი გვარი"
                  : "მინიმუმ 2 სიმბოლო, ქართული ასოები"}
              </span>
            </div>
          </div>

          {/* select your team */}
          <div className="mt-4">
            <select
              name="team"
              style={
                errors.team
                  ? { border: "1px solid red ", outline: "none" }
                  : undefined
              }
              {...register("team", { required: true })}
            >
              <option value="">თიმი</option>
              {teams?.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>

          {/* select your possition */}
          <div className="mt-4">
            <select
              name="position"
              style={
                errors.possition
                  ? { border: "1px solid red ", outline: "none" }
                  : undefined
              }
              {...register("possition", { required: true })}
            >
              <option value="">პოზიცია</option>

              {position
                ?.filter((el) => el.team_id === +teamId)
                .map((el) => {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  );
                })}
            </select>
          </div>

          {/*mail*/}
          <div className={`mt-4 input-error ${errors.email ? "active" : ""}`}>
            <label htmlFor="">მეილი</label>
            <input
              style={{ width: "100%" }}
              id="email"
              {...register("email", {
                required: true,
                pattern: /^[a-z0-9._%+-]+@redberry.ge/,
              })}
            />
            <span>
              {errors.email
                ? errors.email.type === "pattern"
                  ? "არასწორი მეილის ნიმუში, მეილი უნდა მთავრდებოდეს @redberry.ge-ით "
                  : "მითითეთ თქვენი მეილი"
                : "უნდა მთავრდებოდეს @redberry.ge-ით"}
            </span>
          </div>

          {/* phoneNumbers */}
          <div
            className={`mt-4 input-error ${errors.phoneNumber ? "active" : ""}`}
          >
            <label htmlFor="">ტელეფონის ნომერი</label>
            <input
              style={{ width: "100%" }}
              id="phoneNumber"
              placeholder="+9955__ __ __ __"
              {...register("phoneNumber", {
                required: true,
                maxLength: 13,
                pattern: /^\+[0-9]{3}[0-9]{9}/g,
              })}
            />
            <span>
              {errors.phoneNumber
                ? errors.phoneNumber.type === "pattern"
                  ? "თქვენი ნომერი არ აგმაყოფილებს ქართული ნიმრის ფორმატს"
                  : "მიუთითეთ თქვენი ნომერი სწორ ფორმატში"
                : "უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს"}
            </span>
          </div>

          <div className="d-flex mt-4 justify-content-end">
            <Button text="შემდეგი" width="174px" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeInfo;

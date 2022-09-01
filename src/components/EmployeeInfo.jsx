import React, { useEffect } from 'react'
import { Button } from './Buttons'
import TextField from "@mui/material/TextField";
import useFormPersist from "react-hook-form-persist";
import Cookies from 'js-cookie';
import { useForm, Controller } from "react-hook-form";  
import Select from "react-select";

const EmployeeInfo = () => {

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
 
  useFormPersist("", { watch, setValue }); //this keep your information after reload the page

  const submitHandler = ({ name, email, phoneNumber, lastName,possition, team }) => {
    Cookies.set("employeeInfo", JSON.stringify( { name: name, email: email, phoneNumber: phoneNumber, lastName: lastName, possition:  possition, team: team }))
    
  };


  return (
    <div className='rounded-1 h-100 mb-5 infocont' style={{backgroundColor: 'white', borderRadius:"18px" }}>

<form className='h-100'action="submit" onSubmit={handleSubmit(submitHandler)}>
<div className='d-flex flex-column h-100 w-100 justify-content-between '>
  <div className='row'>


  {/*name */}
<div className='col-12 col-md-6'>
  <label htmlFor="">სახელი</label>
  <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                maxLength: 12,
                minLength: 1,
                  pattern: /[ა-ზა-ზ]/ig,
              }}
  
              render={({ field }) => (
                <TextField
                style={{width: '100%'}}
                  id="name "
                  defaultValue="Small"
                  sx={{
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 },
                  }}
                  inputProps={{ type: "name" }}
                  error={Boolean(errors.name)}
               
                  helperText={
                    errors.name ?
                    errors.name.type === "pattern" ? "გამოიყენეთ ქართული ასობეი" :
                      errors.name.type === "maxLength" ||
                        errors.name.type === "minLength"
                        ? "სახელი უნდა შეიცავდეს 2 დან 12 სიმბოლომდე." :
                    "მიუთითეთ თქვენი სახელი"
                      : "მინიმუმ 2 სიმბოლო, ქართული ასოები"
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
        
</div>

  {/*lastName */}
<div className='col-12 col-md-6'>
  <label htmlFor="">გვარი</label>
  <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                maxLength: 12,
                minLength: 1,
                  pattern: /[ა-ზა-ზ]/ig,
              }}
              render={({ field }) => (
                <TextField
                style={{width: '100%'}}
                  id="lastName"
                  defaultValue="Small"
                  sx={{
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 },
                  }}
                  inputProps={{ type: "lastName" }}
                  error={Boolean(errors.lastName)}
               
                  helperText={
                    errors.lastName ?
                    errors.lastName.type === "pattern" ? "გამოიყენეთ ქართული ასობეი" :
                      errors.lastName.type === "maxLength" ||
                        errors.lastName.type === "minLength"
                        ? "გვარი უნდა შეიცავდეს 2 დან 12 სიმბოლომდე." :
                    "მიუთითეთ თქვენი გვარი"
                      : "მინიმუმ 2 სიმბოლო, ქართული ასოები"
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
        
</div>
</div>

{/* select your team */}
<div className='mt-2'>
<Controller
        name="team"
        control={control}
        rules={{
          required: true, 
        }}
        render={({ field }) => <Select 
        required
        name="team"
        placeholder="თიმი"
          {...field} 
          options={[
            { value: "chocolate", label: "Chocolate" },
            { value: "strawberry", label: "Strawberry" },
            { value: "vanilla", label: "Vanilla" }
          ]} 
        />}
      />
</div>
 
{/* select your possition */}
<div className='mt-2'>
<Controller
        name="possition"
        control={control}
        defaultValue=""
        rules={{
          required: true, 
        }}
        render={({ field }) => <Select 
        required
        name="possition"
        placeholder="პოზიცია"
          {...field} 
          options={[
            { value: "chocolate", label: "Chocolate" },
            { value: "strawberry", label: "Strawberry" },
            { value: "vanilla", label: "Vanilla" }
          ]} 
        />}
      />

</div>

  {/*mail*/}
<div className='mt-2'>
  <label htmlFor="">მეილი</label>
  <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@redberry.ge/,
              }}
              render={({ field }) => (
                <TextField
                 style={{width:"100%"}}
                  id="email"
                  variant="outlined"
                  sx={{
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 },
                  }}
                  inputProps={{ type: "email" }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === "pattern"
                        ? "არასწორი მეილის ნიმუში, მეილი უნდა მთავრდებოდეს @redberry.ge-ით "
                        : "მითითეთ თქვენი მეილი"
                      : "უნდა მთავრდებოდეს @redberry.ge-ით"
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
</div>

{/* phoneNumbers */}
<div className='mt-2'>
  <label htmlFor="">ტელეფონის ნომერი</label>
<Controller
        name="phoneNumber"
              control={control}
              defaultValue={'+995'}
              rules={{
                required: true,
                maxLength: 13,
             
                pattern: /^\+[0-9]{3}[0-9]{9}/g 
              }}
              render={({ field }) => (
                <TextField
                style={{width: '100%'}}
                  id="phoneNumber"
                  placeholder="+995 5__ __ __ __"
                  sx={{
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 },
                  }}
                  inputProps={{ type: "phoneNumber" }}
                  error={Boolean(errors.phoneNumber)}
                  helperText={
                    errors.phoneNumber
                      ? errors.phoneNumber.type === "pattern" 
                        ? "თქვენი ნომერი არ აგმაყოფილებს ქართული ნიმრის ფორმატს"  : "მიუთითეთ თქვენი ნომერი " :"უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს"
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
</div>

<div className='d-flex mt-2 justify-content-end'>
<Button text="შემდეგი" width="174px"/>
</div>
</div>
</form>

    </div>
  )
} 

export default EmployeeInfo
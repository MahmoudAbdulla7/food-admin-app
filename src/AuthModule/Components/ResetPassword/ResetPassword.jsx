import React, { useRef,useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../../assets/1.png';
import { useForm,toast,customFetch,useNavigate } from "../../../utls/index";
import Loading from '../../../SharedModule/Components/Loading/Loading';
export default function ResetPassword({saveAdminData}) {
  const navigate =useNavigate();
  const [isLoading, setisLoading] = useState(false);

  let {register,handleSubmit,formState:{errors},watch} =useForm();
  const password = useRef({});
  password.current = watch('password', '');

  function onSubmit(data) {
    setisLoading(true)
    customFetch({method:"post",path:"Users/Reset",data})
    .then(result=>{
      toast("success");
      setisLoading(false)
      navigate("/login");
    })
    .catch(error=>{
      setisLoading(false)
      return toast(error?.response.data.message)
    })
  }
  return (
    <div className='Auth-container container-fluid'>
      <div className="row bg-overLay vh-100 justify-content-center">
      <div>
        
      </div>
        <div className="col-md-6 ">
          <div className='bg-light p-3 rounded-3'>
            <div className="text-center">
            <img src={logo} className='w-25' alt="logo" />
            </div>

            <form className='w-75 m-auto' onSubmit={handleSubmit(onSubmit)}>
            <h2> Reset  Password</h2>
            <p className='text-muted'>Please Enter Your Otp  or Check Your Inbox</p>
              <div className="form-group my-3">
              <input placeholder='Enter your email' className="form-control " type='email' {...register("email",{required:"email is required",pattern:/^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/})}/>
              {errors.email&&<span className='text-danger ps-1'>{errors.email.message||"invalid email"}</span>}
              </div>
              <div className="form-group mt-3">
              <input  placeholder='OTP' className="form-control" type='text' {...register("seed",{required:true})}/>
              {errors.seed?.type=="required"&&<span className='text-danger ps-1'></span>}
              </div>
              <div className="form-group my-3">
              <input  placeholder='Enter your new password' className="form-control" name='password' type='password'{...register("password",{required:"new password is required",minLength:"Password must have at least 6 characters"})}  />
              {errors.password&&<span className='text-danger ps-1'>{errors.password.message} </span>}
              </div>
              <div className="form-group my-3">
              <input  placeholder='Confirm password' className="form-control" type='password' {...register("confirmPassword",{required:'confirm password is required',validate:(value)=>  value == password.current || 'Passwords do not match'})} />
              {errors.confirmPassword&&<span className='text-danger ps-1'>{errors.confirmPassword.message}</span>}
              </div>
              <button className='btn btn-success w-100'>{isLoading?<Loading/>:<span>Reset Password</span>} </button>

            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

import React,{useState} from 'react';
import logo from '../../../assets/1.png';
import { useForm,toast,customFetch,useNavigate } from "../../../utls/index";
import Loading from '../../../SharedModule/Components/Loading/Loading';




export default function ForgetPassword() {
  const navigate =useNavigate();
  const [isLoading, setisLoading] = useState(false);
  let {register,handleSubmit,formState:{errors}} =useForm();
  function onSubmit(data) {
    setisLoading(true)
    customFetch({method:"post",path:"Users/Reset/Request",data})
    .then(result=>{
      setisLoading(false)
      toast(result.data.message);
      navigate("/reset-password");
    })
    .catch(error=>{
      setisLoading(false)
      return toast("Email does not exist")})
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
            <h2>Request Reset  Password</h2>
            <p className='text-muted'>Please Enter Your Email And Check Your Inbox</p>
              <div className="form-group my-3">
              <input placeholder='Enter your email' className="form-control " type='email' {...register("email",{required:"email is required",pattern:/^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/})}/>
              {errors.email&&<span className='text-danger ps-1'>{errors.email.message||"invalid email"}</span>}
              </div>
              <button className='btn btn-success w-100'>{isLoading?<Loading/>:<span>Send</span>}</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

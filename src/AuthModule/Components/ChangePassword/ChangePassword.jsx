import React, { useState, useRef } from "react";
import logo from "../../../assets/1.png";
import {
  useForm,
  toast,
  customFetch,
  useNavigate,
  Modal,
} from "../../../utls/index";
import Loading from "../../../SharedModule/Components/Loading/Loading";

export default function ChangePassword({ show, handleClose }) {
  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const password = useRef({});
  password.current = watch("newPassword", "");

  //api intgration
  function onSubmit(data) {
    setisLoading(true);
    customFetch({
      path: "Users/ChangePassword",
      method: "put",
      data,
      logedIn: true,
    })
      .then((result) =>
        //toast && navigate

        {
          setisLoading(false);
          toast(result.data.message);
          navigate("/login");
        }
      )
      .catch((error) =>
        //handel error
        {toast("Invalid password")
        setisLoading(false);
      }
      );
  }

  return (
    <>
      <Modal className="p-5" show={show} onHide={handleClose}>
        <Modal.Header>
          <div>
            <div className="logo text-center">
              <img src={logo} className="w-50" alt="" />
            </div>
            <h3>Change Password</h3>
            <p className="text-muted">Enter your details below</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group my-3">
                <input
                  placeholder="Enter your Old password"
                  className="form-control "
                  type="password"
                  {...register("oldPassword", {
                    required: "password is required",
                    minLength: "Password must have at least 6 characters",
                    maxLength: "Password must have at most 20 characters",
                  })}
                />
                {errors.oldPassword && (
                  <span className="text-danger ps-1">
                    {errors.oldPassword.message}
                  </span>
                )}
              </div>
              <div className="form-group my-3">
                <input
                  placeholder="Enter your new password"
                  className="form-control"
                  name="newPassword"
                  type="password"
                  {...register("newPassword", {
                    required: "new password is required",
                    minLength: "Password must have at least 6 characters",
                    maxLength: "Password must have at most 20 characters",
                  })}
                />
                {errors.newPassword && (
                  <span className="text-danger ps-1">
                    {" "}
                    {errors.newPassword.message}{" "}
                  </span>
                )}
              </div>
              <div className="form-group my-3">
                <input
                  placeholder="Confirm password"
                  className="form-control"
                  type="password"
                  {...register("confirmNewPassword", {
                    required: "confirm new password is required",
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                />
                {errors.confirmNewPassword && (
                  <span className="text-danger ps-1">
                    {errors.confirmNewPassword.message}
                  </span>
                )}
                <button className="btn btn-success my-3 w-100">
                  {isLoading?<Loading/>:<span>Change Password</span>}
                </button>
              </div>
            </form>
          </div>
        </Modal.Header>
      </Modal>
    </>
  );
}

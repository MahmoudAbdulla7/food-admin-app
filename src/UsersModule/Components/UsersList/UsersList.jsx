import React from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import { useForm, toast, customFetch, Modal, deleteItem, getList } from "../../../utls/index";
import { useEffect, useState } from "react";
import noData from "../../../assets/no data.svg";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import Loading from "../../../SharedModule/Components/Loading/Loading";
import Pagination from "../../../SharedModule/Components/Pagination/Pagination";
import DeleteModal from "../../../SharedModule/Components/DeleteModal/DeleteModal";

export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [handelLoadingOfModal, setHandelLoadingOfModal] = useState(false);
  const [modelState, setModelState] = useState("close");
  const [searchValue, setSearchValue] = useState(null);
  const [itemId, setItemId] = useState();
  const [group, setGroup] = useState(null);


  const handleShow = () => setShow(true);
  const handleClose = () => setModelState("close");


  // get Data from Api
  function getUsersList({ pageNumber = 1, userName, groups } = []) {
    getList({
      path:"Users",
      setList:setUsersList,
      setIsLoading:setIsLoading,
      setNumberOfPages:setNumberOfPages,
      pageNumber : pageNumber,
      userName,
    })
  };


  useEffect(() => {
    getUsersList();
  }, []);

  //---

  function showDeleteModal(id) {
    setModelState("Delete");
  }

  // --- Dalete User
  
  
  function deleteUser(e) {
    
    e.preventDefault();
    deleteItem({itemType:"Users", itemId, getListFunction:getUsersList,setHandelLoadingOfModal,handleClose});
  }
  
  function showDeleteModal(id) {
    setModelState("Delete");
    setItemId(id);
  }

  //--- searchByName
  function searchByName(e) {
    setSearchValue(e.target.value);
    getUsersList({ userName: e.target.value, groups: group });
  }

  //--- FillterByRole
  function fillterByRole(e) {
    setGroup(e.target.value);
    getUsersList({ userName: searchValue, groups: e.target.value });
  }

  return (
    <>
      <Header />
      <div className="ms-3 py-3">
        <h4>Users Table Details</h4>
        <span>You can check all details</span>
      </div>

      <div className="d-flex my-2">
        <div className="col-md-6">
          <div className="nameValue pe-2">
            <input
              onChange={searchByName}
              className="form-control "
              placeholder="Name of recipe"
              type="text"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="Tag px-2">
            <select
              onChange={fillterByRole}
              className="form-select"
              itemType="Number"
              aria-label="Default select example"
            >
              <option value={null}>Select Role</option>
              <option value={1}>Admin</option>
              <option value={2}>User</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-table fs-1 text-black-50 d-flex justify-content-center align-items-center">
          <Loading />
        </div>
      ) : usersList.length > 0 ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {usersList?.map((user, idx) => (
              <tbody key={user.id}>
                <tr>
                  <th scope="row">{user.userName}</th>
                  <td className="w-25 text-start">
                    <img
                      className="w-25"
                      src={
                        user.imagePath
                          ? `https://upskilling-egypt.com:443/${user.imagePath}`
                          : noData
                      }
                      alt=""
                    />
                  </td>
                  <th scope="row">{user.phoneNumber}</th>
                  <td>
                    <div className="dropdown">
                      <button
                        className="btn  text-success"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa-solid fa-ellipsis"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <p
                            onClick={() => showDeleteModal(user.id)}
                            className="px-2 py-1 btn"
                          >
                            <i className="fa-regular fa-trash-can text-success"></i>{" "}
                            Delete
                          </p>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </>
      ) : (
        <NoData />
      )}

      <Pagination
        getList={getUsersList}
        searchValue={searchValue}
        numberOfPages={numberOfPages}
      />

      
      <DeleteModal isLoading={handelLoadingOfModal} modelState={modelState} handleClose={handleClose} onSubmit={deleteUser}/>

    </>
  );
}

import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import noData from "../../../assets/no data.svg";
import { useForm, toast, customFetch, Modal, addNewItem, deleteItem, updateItem, getList } from "../../../utls/index";
import Loading from "../../../SharedModule/Components/Loading/Loading";
import Pagination from "../../../SharedModule/Components/Pagination/Pagination";
import DeleteModal from "../../../SharedModule/Components/DeleteModal/DeleteModal";

export default function CategoriesList() {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [handelLoadingOfModal, setHandelLoadingOfModal] = useState(false);
  const [searchValue, setSearchValue] = useState(null)
  const [numberOfPages, setNumberOfPages] = useState([]);
  const [show, setShow] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [modelState, setModelState] = useState("close");
  const handleShow = () => setShow(true);


  function getCategoryList({ pageNumber ,name } = []) {
    getList({
      path:"Category",
      setList:setCategoryList,
      setIsLoading:setIsLoading,
      setNumberOfPages:setNumberOfPages,
      pageNumber : pageNumber,
      name,
    })
  }

  useEffect(() => {
    getCategoryList();
  }, []);

  // handel model --
  let {
    register,

    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();


  //--- add
  function showAddModal() {
    setValue("name", null);
    setModelState("Add");
  }

  function addNewCategory(data) {
    addNewItem({apiPath:"Category/", data, getListFunction:getCategoryList,setHandelLoadingOfModal,handleClose})
  }

  //--- delete
  function deleteCategory(e) {
    e.preventDefault();
    deleteItem({itemType:"Category", itemId, getListFunction:getCategoryList,setHandelLoadingOfModal,handleClose});
  }

  function showDeleteModal(id) {
    setModelState("Delete");
    setItemId(id);
  }

  //--- update
  function showUpdateModal(categoryItem) {
    setItemId(categoryItem.id);
    setValue("name", categoryItem.name);
    setModelState("Update");
  }

  function updateCategory(data) {
    setHandelLoadingOfModal(true);
    updateItem({itemType:"Category", itemId:itemId, data, getListFunction:getCategoryList,setHandelLoadingOfModal,handleClose});
  }

  const handleClose = () => setModelState("close");

  return (
    <>
      <div>
        <Header />
        <div className="row justify-content-between py-4">
          <div className="col-md-6 px-4 text-dark">
            <div>
              <h4>Categories Table Details</h4>
              <span>You can check all details</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className=" categoryButton">
              <button onClick={showAddModal} className="btn btn-success me-1">
                Add New Category
              </button>
            </div>
          </div>
        </div>
        <div className="nameValue">
          <input onChange={(e)=>{setSearchValue(e.target.value); return getCategoryList({name:e.target.value})}} className="form-control my-2" placeholder="Name of category" type="text" />
        </div>
        {isLoading ? (
          <div className="loading-table fs-1 text-black-50 d-flex justify-content-center align-items-center">
            {" "}
            <Loading />
          </div>
        ) : categoryList.length>0 ? (
          <>
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              {categoryList?.map((category, idx) => (
                <tbody key={category.id}>
                  <tr>
                    <th scope="row">{idx + 1}</th>
                    <td>{category.name}</td>
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
                              onClick={() => showUpdateModal(category)}
                              className="px-2 py-1 btn"
                            >
                              <i className="fa-regular fa-pen-to-square text-success"></i>{" "}
                              Update
                            </p>
                          </li>
                          <li>
                            <p
                              onClick={() => showDeleteModal(category.id)}
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
      </div>

      <Pagination getList={getCategoryList} numberOfPages={numberOfPages} searchValue={searchValue}/>
      <Modal className="p-5" show={modelState == "Add"} onHide={handleClose}>
        <form onSubmit={handleSubmit(addNewCategory)} className="p-4">
          <h2 className="mb-5">Add Category</h2>
          <input
            type="text"
            className="form-control"
            placeholder="Category Name"
            {...register("name", { required: "Field is required" })}
          />
          {errors.name && (
            <span className="text-danger ms-2">{errors.name.message}</span>
          )}
          <hr />
          <div className="text-end">
            <button className="btn btn-success px-4">
              {handelLoadingOfModal ? <Loading /> : <span>Save</span>}
            </button>
          </div>
        </form>
      </Modal>
      <DeleteModal isLoading={handelLoadingOfModal} modelState={modelState} handleClose={handleClose} onSubmit={deleteCategory}/>
      
      <Modal className="p-5" show={modelState == "Update"} onHide={handleClose}>
        <form onSubmit={handleSubmit(updateCategory)} className="p-4">
          <h2 className="mb-5">Add Category</h2>
          <input
            type="text"
            className="form-control"
            placeholder="Category Name"
            {...register("name", { required: "Field is required" })}
          />
          {errors.name && (
            <span className="text-danger ms-2">{errors.name.message}</span>
          )}
          <hr />
          <div className="text-end">
            <button className="btn btn-success px-4">
              {handelLoadingOfModal ? <Loading /> : <span>Save</span>}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}


import React from 'react'
import { Modal } from 'react-bootstrap'
import noData from '../../../assets/no data.svg'
import Loading from '../Loading/Loading'

export default function DeleteModal({isLoading, onSubmit,modelState,handleClose}) {
  return (
    <Modal className="p-5" show={modelState == "Delete"} onHide={handleClose}>
    <form onSubmit={onSubmit} className="p-4 text-center">
      <img src={noData} alt="#" />
      <h5 className="mb-5">Delete This Category ?</h5>
      <span className="text-muted">
        are you sure you want to delete this item ? if you are sure just
        click on delete it
      </span>
      <hr />
      <div className="text-end">
        <button className="btn btn-danger px-4">{isLoading?<Loading/>:"Delete this item"}</button>
      </div>
    </form>
  </Modal>
  )
}

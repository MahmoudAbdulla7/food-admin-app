import React from 'react'
import noData from '../../../assets/no data.svg'
export default function NoData() {
  return (
    <>
    <div className="text-center">
      <img className="w-25" src={noData} alt="" />
      <h5 className="my-2">No Data !</h5>
      <p className="text-muted">are you sure you want to delete this item ? if you are sure just click on delete it</p>
    </div>
    </>
  )
}

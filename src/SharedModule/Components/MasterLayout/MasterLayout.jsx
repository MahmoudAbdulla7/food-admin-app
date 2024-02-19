import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
export default function MasterLayout({adminData}) {
  return (
    <>

        <div className="d-flex w-100">
                <Sidebar/>
            <div className="w-100 ">
                <div>
                    <Navbar adminData={adminData}/>
                    <Outlet/>
                    
                </div>
            </div>
        </div>

    </>
  )
}

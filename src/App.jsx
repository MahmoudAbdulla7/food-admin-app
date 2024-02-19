import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MasterLayout from './SharedModule/Components/MasterLayout/MasterLayout'
import Home from './HomeModule/Components/Home/Home'
import NotFound from './SharedModule/Components/NotFound/NotFound'
import UsersList from './UsersModule/Components/UsersList/UsersList'
import RecipesList from './RecipesModule/Components/Recipes/RecipesList'
import CategoriesList from './CategoriesModule/Components/CategoriesList/CategoriesList'
import Login from './AuthModule/Components/Login/Login'
import ForgetPassword from './AuthModule/Components/ForgetPassword/ForgetPassword'
import AuthLayout from './SharedModule/Components/AuthLayout/AuthLayout'
import { jwtDecode } from 'jwt-decode'
import ProtectedRoute from './SharedModule/Components/ProtectedRoute/ProtectedRoute'
import ResetPassword from './AuthModule/Components/ResetPassword/ResetPassword'
import { ToastContainer } from 'react-toastify'


function App() {
  let [adminData, setAdminData] = useState(null);

  function saveAdminData() {
    let encodedData =localStorage.getItem("adminTkn");
    let decodedTkn =jwtDecode(encodedData);
    setAdminData(decodedTkn)
  }
  
  useEffect(()=>{
    if (localStorage.getItem("adminTkn")) {
      saveAdminData()
    }
  },[])

  let router =createBrowserRouter([
    {
      path:'dashboard',element:(<ProtectedRoute adminData={adminData}><MasterLayout adminData={adminData}/></ProtectedRoute>),errorElement:<NotFound/>,children:[
        {index:true,element:<Home adminData={adminData}/>},
        {path:'users',element:<UsersList/>},
        {path:'recipes',element:<RecipesList/>},
        {path:'categories',element:<CategoriesList/>}
      ]
  
    },
    {
      
      path:'/',element:(<AuthLayout/>),errorElement:<NotFound/>,children:[
        {index:true,element:<Login saveAdminData={saveAdminData}/>},
        {path:'login',element:<Login saveAdminData={saveAdminData}/>},
        {path:'forget-password',element:<ForgetPassword/>},
        {path:'reset-password',element:<ResetPassword/>},
      ]
    }
  ])

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}/>
    </>
  )
}

export default App

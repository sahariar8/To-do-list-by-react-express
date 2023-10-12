import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './assets/component/Home'
import Users from './assets/component/Users'
import Update from './assets/component/Update'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home></Home>,
    children:[
      {
      path:'/',
      element:<Users></Users>,
      loader:()=>fetch('http://localhost:3000/users')
      },
      {
        path:'/users/:id',
        element:<Update></Update>,
        loader:({params})=>fetch(`http://localhost:3000/users/${params.id}`)
      }
  ]
  }
  
  
   
  
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)

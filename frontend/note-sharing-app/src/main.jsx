import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { createRoot } from "react-dom/client";
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AuthLayout from './Layouts/AuthLayout';
import GuestLayout from './Layouts/GuestLayout';
import NoteForm from './components/NoteForm';
let router = createBrowserRouter([
      {
        Component:GuestLayout,
        children:[
          {path:'signup',  Component:Signup},
          {path:'/',Component:Login}
        ]
      },
      {
        Component:AuthLayout,
        children:[
          {path:'dashboard',Component:Dashboard},
          {path:'createnote',Component:NoteForm}
        ]
      }

    
  
]);
createRoot(document.getElementById('root')).render(
 
    <Provider store={store}>
       <RouterProvider router={router} >
       <App />
       </RouterProvider>
      
    </Provider>

);

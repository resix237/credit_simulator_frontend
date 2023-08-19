import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';

import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  defer,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthLayout from './components/layouts/AuthLayout';
import { IsAuthenticated } from './components/contexts/RoutingContext';
import Dashboard from './pages/Dashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCredit from './pages/AddCredit';





function getUserData() {
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem('user');
      resolve(user);
    }, 3000)
  );
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        element={<IsAuthenticated />}
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addcredit" element={<AddCredit />} />
        <Route path="/addcredit/:id" element={<AddCredit />} />
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<div> Not found</div>} />
    </Route>

  )
);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

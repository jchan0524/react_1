import React, { useEffect } from "react";
import "./index.css";
import { createContext, useState } from "react";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import NotFound from "./components/NotFound";
import Customers from "./pages/Customers";
import Customer from "./pages/Customer";
import Login from "./pages/Login";
import { baseUrl } from "./shared";
import Register from "./pages/Register";

export const LoginContext = createContext();

//Put sidewide changes in this file
//example header and login functionality

function App() {
  useEffect(() => {
    function refreshTokens() {
      if (localStorage.refresh) {
        const url = baseUrl + "api/token/refresh/";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: localStorage.refresh,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            localStorage.access = data.access;
            localStorage.refresh = data.refresh;
            setLoggedIn(true);
          });
      }
    }

    const minutes = 1000 * 60;
    refreshTokens();
    setInterval(refreshTokens, minutes * 3);
  }, []);
  //check local storage for access token --> may be expired
  //long term goal --> use Refresh token and if it works, stay logged in, otherwise, send to login page
  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);

  function changeLoggedIn(value) {
    setLoggedIn(value);
    console.log("jalfjdklafkldaf");
    if (value === false) {
      console.log("HELLOOOOOOO");
      localStorage.clear();
    }
  }

  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/employee" element={<Employees />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/dictionary/:search" element={<Definition />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customers/:id" element={<Customer />} />
            <Route path="/404" element={<NotFound />} />
            <Route path = '/register' element={<Register/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;

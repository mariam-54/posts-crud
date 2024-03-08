import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import { Provider } from "react-redux";
import poststore from "./Redux/store";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={poststore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right"></ToastContainer>
    </Provider>
  );
}

export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import CreateInvoice from './components/CreateInvoice';
import Header from "./components/Header";
import Home from "./components/Home";
import Pdf from "./components/Pdf";
import Register from "./components/Register";
import Login from "./components/Login";
import './App.css'
function App(props) {
  return (
    <>

      <Router>
        <Header />
        <br /> <br />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route path='/CreateInvoice' element={<CreateInvoice />}></Route>
          <Route path="/pdf/:id" element={<Pdf/>}></Route>
          <Route path="/update/:id" element={<CreateInvoice/>}></Route>
          <Route path="/delete/:id" element={<Home/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

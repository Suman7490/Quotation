import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import CreateInvoice from './components/CreateInvoice';
import Header from "./components/Header";
import Print from "./components/Print";
import Update from "./components/Update";
import Home from "./components/Home";
import Pdf from "./components/Pdf";

function App(props) {
  return (
    <>

      <Router>
        
        <Header />
        <br /> <br />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route path='/CreateInvoice' element={<CreateInvoice />}></Route>
          <Route path="/update" element={<Update />}></Route>
          <Route path="/print" element={<Print/>}></Route>
          <Route path="/pdf/:id" element={<Pdf/>}></Route>
          <Route path="/edit/:id" element={<CreateInvoice/>}></Route>
          <Route path="/delete/:id" element={<Home/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

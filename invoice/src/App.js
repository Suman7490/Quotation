import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import View from './components/View';
import CreateInvoice from './components/CreateInvoice';
import Header from "./components/Header";
import Print from "./components/Print";
import Update from "./components/Update";
import Home from "./components/Home";

function App(props) {
  return (
    <>

      <Router>
        
        <Header />
        <Home/>
        <br /> <br />
        <Routes>
          <Route exact path='/' element={<View />}></Route>
          <Route path='/CreateInvoice' element={<CreateInvoice />}></Route>
          <Route path="/update" element={<Update />}></Route>
          <Route path="/print" element={<Print/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

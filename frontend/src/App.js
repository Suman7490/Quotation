import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CreateInvoice from './components/CreateInvoice';
import Header from "./components/Header";
import Home from "./components/Home";
import Pdf from "./components/Pdf";
import Register from "./components/Register";
import Login from "./components/Login";
import './App.css'
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      <div className="" style={{ height: '100vh' }}>

        <Router>
          {isAuthenticated && <Header />}
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/home" /> : <Login setIsAuthenticated={setIsAuthenticated} />
              }
            />
            {isAuthenticated ? (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/CreateInvoice" element={<CreateInvoice />} />
                <Route path="/pdf/:id" element={<Pdf />} />
                <Route path="/update/:id" element={<CreateInvoice />} />
                <Route path="/delete/:id" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/home" />} />
              </>
            ) : (
              <>
              <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </Router>

      </div>
    </>
  );
}

export default App;

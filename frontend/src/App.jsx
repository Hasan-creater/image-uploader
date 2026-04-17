import { BrowserRouter , Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {

  return (

    <BrowserRouter>

      <Navbar />
                <h2>Welcome to Uplaod Pic ERS</h2>

      <Routes>
      
       <Route path="/login"    element={<Login />} />
       <Route path="/register" element={<Register />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
          
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
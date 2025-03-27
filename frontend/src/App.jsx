// import { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "./components/Sidebar";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import ExpiredMedicines from "./pages/ExpiredMedicines";
// import Discounts from "./pages/Discounts";
// import OutOfStock from "./pages/OutOfStock";
// import Settings from "./pages/Settings";
// import Inventory from "./pages/Inventory";
// import { Toaster } from "react-hot-toast";
// import { isAuthenticated } from "./utils/auth";

// function App() {
//   const [auth, setAuth] = useState(isAuthenticated());
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     const checkAuth = () => {
//       setAuth(isAuthenticated());
//     };

//     window.addEventListener("storage", checkAuth);
//     return () => window.removeEventListener("storage", checkAuth);
//   }, []);

//   // API request to check backend connection
//   useEffect(() => {
//     axios.get("http://127.0.0.1:8000/api/test/")
//       .then(response => console.log("Backend Response:", response.data))
//       .catch(error => console.error("Error connecting to backend:", error));
//   }, []);

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-100 flex">
//         {auth && <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} setAuth={setAuth} />}
//         <div className={`flex-1 ${auth ? "lg:ml-64" : ""} transition-all duration-200 ease-in-out`}>
//           <Routes>
//             <Route path="/login" element={auth ? <Navigate to="/" replace /> : <Login setAuth={setAuth} />} />
//             <Route path="/signup" element={auth ? <Navigate to="/" replace /> : <Signup setAuth={setAuth} />} />
//             <Route
//               path="/"
//               element={
//                 auth ? (
//                   <Dashboard sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//                 ) : (
//                   <Navigate to="/login" replace />
//                 )
//               }
//             />
//             <Route path="/expired-medicines" element={auth ? <ExpiredMedicines /> : <Navigate to="/login" replace />} />
//             <Route path="/discounts" element={auth ? <Discounts /> : <Navigate to="/login" replace />} />
//             <Route path="/out-of-stock" element={auth ? <OutOfStock /> : <Navigate to="/login" replace />} />
//             <Route path="/settings" element={auth ? <Settings /> : <Navigate to="/login" replace />} />
//             <Route path="/inventory" element={auth ? <Inventory /> : <Navigate to="/login" replace />} />
//           </Routes>
//         </div>
//       </div>
//       <Toaster />
//     </Router>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ExpiredMedicines from "./pages/ExpiredMedicines";
import Discounts from "./pages/Discounts";
import OutOfStock from "./pages/OutOfStock";
import Settings from "./pages/Settings";
import Inventory from "./pages/Inventory";
import { Toaster } from "react-hot-toast";
import { isAuthenticated } from "./utils/auth";

function App() {
  const [auth, setAuth] = useState(isAuthenticated());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inventoryData, setInventoryData] = useState([]); // ✅ State for inventory

  useEffect(() => {
    const checkAuth = () => {
      setAuth(isAuthenticated());
    };

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // ✅ Fetch inventory data from backend
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/inventory/")
      .then(response => {
        console.log("Inventory Data:", response.data);
        setInventoryData(response.data);
      })
      .catch(error => console.error("Error fetching inventory:", error));
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex">
        {auth && <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} setAuth={setAuth} />}
        <div className={`flex-1 ${auth ? "lg:ml-64" : ""} transition-all duration-200 ease-in-out`}>
          <Routes>
            <Route path="/login" element={auth ? <Navigate to="/" replace /> : <Login setAuth={setAuth} />} />
            <Route path="/signup" element={auth ? <Navigate to="/" replace /> : <Signup setAuth={setAuth} />} />
            <Route
              path="/"
              element={auth ? <Dashboard sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> : <Navigate to="/login" replace />}
            />
            <Route path="/expired-medicines" element={auth ? <ExpiredMedicines /> : <Navigate to="/login" replace />} />
            <Route path="/discounts" element={auth ? <Discounts /> : <Navigate to="/login" replace />} />
            <Route path="/out-of-stock" element={auth ? <OutOfStock /> : <Navigate to="/login" replace />} />
            <Route path="/settings" element={auth ? <Settings /> : <Navigate to="/login" replace />} />
            <Route path="/inventory" element={auth ? <Inventory data={inventoryData} /> : <Navigate to="/login" replace />} /> {/* ✅ Pass inventory data */}
          </Routes>
        </div>
      </div>
      <Toaster />
    </Router>
  );
}

export default App;

import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import AddNewDoctor from "../components/AddNewDoctor";
import Messages from "../components/Messages";
import Doctors from "../components/Doctors";
import { Context } from "./main";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar";
import AddNewAdmin from "../components/AddNewAdmin";
import "./App.css";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  useEffect(() => {
    // Actualizare titlu pagină în funcție de rută
    const handleRouteChange = () => {
      const route = window.location.pathname;
      switch (route) {
        case "/":
          document.title = "Dashboard - Medical Express";
          break;
        case "/login":
          document.title = "Login - Medical Express";
          break;
        case "/doctor/addnew":
          document.title = "Add New Doctor - Medical Express";
          break;
        case "/admin/addnew":
          document.title = "Add New Admin - Medical Express";
          break;
        case "/messages":
          document.title = "Messages - Medical Express";
          break;
        case "/doctors":
          document.title = "Doctors - Medical Express";
          break;
        default:
          document.title = "Medical Express";
      }
    };

    // Ascultare evenimente pentru schimbarea rutei
    window.addEventListener("popstate", handleRouteChange);
    handleRouteChange(); // Pentru a actualiza titlul la încărcarea inițială a paginii

    // Dezabonare de la evenimente la demontarea componentei
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor/addnew" element={<AddNewDoctor />} />
        <Route path="/admin/addnew" element={<AddNewAdmin />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
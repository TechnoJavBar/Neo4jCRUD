import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import Layout from "./components/Layout.jsx";
import Header from "./components/header/Header.jsx";
import Register from "./components/register/Register.jsx";
import Login from "./components/login/Login.jsx";
import { ProveedoresList } from "./components/proveedores/ProveedoresList.jsx";
import { ProductosList } from "./components/productos/ProductosList.jsx";
import { RegisterProveedor } from "./components/register/RegisterProveedor.jsx";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/proveedor" element={<RegisterProveedor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productos" element={<ProductosList />} />
          <Route path="/proveedores" element={<ProveedoresList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

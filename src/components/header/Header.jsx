import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesStacked } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const navigate = useNavigate();

  const navLinks = [
    { path: "/register", text: "Registrar producto" },
    { path: "/register/proveedor", text: "Registrar proveedor" },
    { path: "/proveedores", text: "Proveedores" },
    { path: "/productos", text: "Productos" },
  ];

  const handleNav = (path) => {
    navigate(path);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand
          onClick={() => handleNav("/")}
          className="menu-link text-info"
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faBoxesStacked} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            {navLinks.map((link) => (
              <Nav.Link key={link.path} onClick={() => handleNav(link.path)}>
                {link.text}
              </Nav.Link>
            ))}
          </Nav>
          <Button variant="outline-info" onClick={() => handleNav("/login")}>
            Login
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSailboat } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
  };

  return (
    <Navbar>
      <Container fluid>
        <Navbar.Brand href="/" className="menu-link" style={{ color: "blue" }}>
          <FontAwesomeIcon icon={faSailboat}></FontAwesomeIcon>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        ></Nav>
        <Button
          variant="info"
          className="me-2"
          onClick={() => handleNav("/login")}
        >
          Login
        </Button>
        <Button
          variant="info"
          className="me-2"
          onClick={() => handleNav("/register")}
        >
          Registrar producto
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;

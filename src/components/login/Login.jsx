import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const usernameRef = useRef();
  const navigate = useNavigate();
  const url_get_producto = "http://localhost:4000/productos";

  const [user, setUser] = useState([]);

  const [username, setUsername] = useState("");
  const [validUserName, setValidUsername] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [showToast, setShowToast] = useState(false);

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const USER_REGEX = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  const PWD_REGX =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    const res = USER_REGEX.test(username);
    setValidUsername(res);
  }, [username]);

  useEffect(() => {
    const res = PWD_REGX.test(pwd);
    setValidPwd(res);
  }, [pwd]);

  const handleNav = (path) => {
    navigate(path);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const request = await fetch(url_get_usuario, {
        method: "GET",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: username,
        }),
      });

      if (!request.ok) {
        setIsError(true);
        setMessage("error al procesar los datos");
        setShowToast(true);
      }

      const data = await request.json();
      console.log(data);
      setUser(data);

      if (pwd == user[0].password) {
        setIsError(false);
        setMessage("Login correcto");
        setShowToast(true);
        navigate("/");
      } else {
        setIsError(true);
        setMessage("La contraseña es incorrecta");
        setShowToast(true);
      }
    } catch (err) {
      console.log("no ha sido posible iniciar sesion");
      setIsError(true);
      setMessage(err);
      setShowToast(true);
    }
  };
  return (
    <Container>
      <header>
        <h4>Register</h4>
        <main className="register-container">
          <div className="register-layout">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2" controlId="formBasicUsername">
                <Form.Label>
                  Username:
                  <span className={validUserName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} className="valid-icon" />
                  </span>
                  <span
                    className={validUserName || !username ? "hide" : "valid"}
                  >
                    <FontAwesomeIcon icon={faTimes} className="invalid-icon" />
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  autoComplete="off"
                  ref={usernameRef}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label>
                  Password:
                  <span className={validPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} className="valid-icon" />
                  </span>
                  <span className={validPwd || !pwd ? "hide" : "valid"}>
                    <FontAwesomeIcon icon={faTimes} className="invalid-icon" />
                  </span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  autoComplete="off"
                  onChange={(e) => setPwd(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                disabled={!validUserName || !validPwd ? true : false}
                variant="info"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </div>
        </main>
      </header>
      {/*Se encarga de mostrar el mensaje ya sea de error o de satisfactorio*/}
      <ToastContainer
        className="p-3"
        position="bottom-end"
        style={{ zIndex: 1 }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">
              {isError ? "error" : "satisfacftorio"}
            </strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body
            style={{ color: "black" }}
            variant={isError ? "Danger" : "Success"}
          >
            {message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Login;

import { useEffect, useRef, useState } from "react";
import { Button, Container, Form, Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faBoxesStacked,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export function Login() {
  const dniRef = useRef();

  const [dni, setDni] = useState("");
  const [validDni, setValidDni] = useState(false);
  const [dniFocus, setDniFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const DNI_REGEX = /^[0-9]{8}[A-Z]$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&]).{8,24}$/;

  useEffect(() => {
    dniRef.current.focus();
  }, []);

  useEffect(() => {
    setValidDni(DNI_REGEX.test(dni));
  }, [dni]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  return (
    <Container fluid className="p-0">
      <Row className="g-0" style={{ minHeight: "calc(100vh - 56px)" }}>
        {/* Form Column */}
        <Col
          md={5}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <Card className="w-100 shadow-sm" style={{ maxWidth: "380px" }}>
            <Card.Body className="p-4">
              <h3 className="text-center mb-4 fw-bold">Iniciar Sesión</h3>
              <Form>
                <Form.Group className="mb-3" controlId="formDni">
                  <Form.Label>
                    DNI
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validDni ? "valid-icon ms-1" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={
                        validDni || !dni ? "hide" : "invalid-icon ms-1"
                      }
                    />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: 12345678A"
                    ref={dniRef}
                    autoComplete="off"
                    onChange={(e) => setDni(e.target.value)}
                    required
                    aria-invalid={validDni ? "false" : "true"}
                    aria-describedby="dnidnote"
                    onFocus={() => setDniFocus(true)}
                    onBlur={() => setDniFocus(false)}
                  />
                  <Form.Text
                    id="dnidnote"
                    className={
                      dniFocus && dni && !validDni ? "instructions" : "hide"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Debe tener 8 números seguidos de una letra mayúscula.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPwd">
                  <Form.Label>
                    Contraseña
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validPwd ? "valid-icon ms-1" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={
                        validPwd || !pwd ? "hide" : "invalid-icon ms-1"
                      }
                    />
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Introduce tu contraseña"
                    autoComplete="off"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                  <Form.Text
                    id="pwdnote"
                    className={pwdFocus && !validPwd ? "instructions" : "hide"}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />8 a 24 caracteres.
                    <br />
                    Debe incluir mayúsculas, minúsculas, un número y un carácter
                    especial (!@#%&).
                  </Form.Text>
                </Form.Group>

                <div className="d-flex justify-content-end mb-3">
                  <Link to="/forgot-password">Olvidaste tu contraseña?</Link>
                </div>

                <Button
                  disabled={!validDni || !validPwd}
                  type="submit"
                  className="w-100 mt-3"
                >
                  Iniciar sesión
                </Button>
              </Form>
              <hr className="my-4" />
              <div className="w-100 text-center">
                <Link to="/register-user">
                  No tienes una cuenta? Regístrate
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Branding Column */}
        <Col
          md={7}
          className="d-none d-md-flex bg-dark text-white flex-column justify-content-center align-items-center p-5"
        >
          <FontAwesomeIcon icon={faBoxesStacked} size="8x" className="mb-4" />
          <h1 className="display-4 fw-bold">TPVaj</h1>
          <p className="lead mt-3 text-center">
            Gestión de inventario simple y poderosa.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

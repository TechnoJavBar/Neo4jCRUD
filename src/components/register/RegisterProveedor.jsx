import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export const RegisterProveedor = () => {
  const URL_CREATE_PROVEEDOR = "http://localhost:4000/proveedor/create";

  const [nombre, setNombre] = useState("");
  const [codigoManufacturer, setCodigoManufacturer] = useState("");
  const [codigoGS1, setCodigoGS1] = useState("");

  const [validNombre, setValidNombre] = useState(false);
  const [validCodigoManufacturer, setValidCodigoManufacturer] = useState(false);
  const [validCodigoGS1, setValidCodigoGS1] = useState(false);

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const nombreRef = useRef();

  const NOMBRE_REGEX = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;

  useEffect(() => {
    nombreRef.current.focus();
  }, []);

  useEffect(() => {
    const result = NOMBRE_REGEX.test(nombre);
    setValidNombre(result);
  }, [nombre]);

  useEffect(() => {
    const result = codigoManufacturer.length === 4;
    setValidCodigoManufacturer(result);
  }, [codigoManufacturer]);

  useEffect(() => {
    const result = codigoGS1.length === 3;
    setValidCodigoGS1(result);
  }, [codigoGS1]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(URL_CREATE_PROVEEDOR, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          nombre: nombre,
          codigoManufacturer: codigoManufacturer,
          paisGS1: codigoGS1,
        }),
      });

      const res = await response.json();
      console.log(res);

      if (!response.ok) {
        setMessage(
          `Error al enviar el proveedor: ${res.error || res.statusText}`
        );
        setIsError(true);
        setShowToast(true);
      } else {
        setMessage(`El proveedor ${nombre} se ha creado correctamente`);
        setIsError(false);
        setShowToast(true);
      }
    } catch (error) {
      console.log("Error al enviar los datos", error);
      setMessage("Error de conexión");
      setIsError(true);
      setShowToast(true);
    }
  };

  return (
    <Container>
      <header>
        <h4>Nuevo Proveedor</h4>
        <main className="register-container">
          <div className="register-layout">
            <Form onSubmit={handleSubmit}>
              <div className="row">
                {/* Columna izquierda */}
                <div className="col-md-6">
                  <Form.Group className="mb-3" controlId="formBasicNombre">
                    <Form.Label>
                      Nombre:
                      <span className={validNombre ? "valid" : "hide"}>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="valid-icon"
                        />
                      </span>
                      <span
                        className={validNombre || !nombre ? "hide" : "valid"}
                      >
                        <FontAwesomeIcon
                          icon={faTimes}
                          className="invalid-icon"
                        />
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ej: Producto A"
                      ref={nombreRef}
                      autoComplete="off"
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>

                {/* Columna derecha */}
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicCodigoManufacturer"
                  >
                    <Form.Label>
                      Código Manufacturer:
                      <span
                        className={validCodigoManufacturer ? "valid" : "hide"}
                      >
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="valid-icon"
                        />
                      </span>
                      <span
                        className={
                          validCodigoManufacturer || !codigoManufacturer
                            ? "hide"
                            : "valid"
                        }
                      >
                        <FontAwesomeIcon
                          icon={faTimes}
                          className="invalid-icon"
                        />
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ej: MFR-12345"
                      autoComplete="off"
                      onChange={(e) => setCodigoManufacturer(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicCodigoGS1">
                    <Form.Label>
                      Código GS1:
                      <span className={validCodigoGS1 ? "valid" : "hide"}>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="valid-icon"
                        />
                      </span>
                      <span
                        className={
                          validCodigoGS1 || !codigoGS1 ? "hide" : "valid"
                        }
                      >
                        <FontAwesomeIcon
                          icon={faTimes}
                          className="invalid-icon"
                        />
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ej: 08412345678903"
                      autoComplete="off"
                      onChange={(e) => setCodigoGS1(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="text-center mt-3">
                <Button
                  disabled={
                    !validNombre || !validCodigoManufacturer || !validCodigoGS1
                  }
                  variant="info"
                  type="submit"
                >
                  Registrar producto
                </Button>
              </div>
            </Form>
          </div>
        </main>
      </header>
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

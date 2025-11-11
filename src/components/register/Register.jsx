import React from "react";
import "./Register.css";
import { useState, useRef, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const nombreRef = useRef();

  const url_create_producto = "http://localhost:4000/producto/create";

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [showToast, setShowToast] = useState(false);

  const [nombre, setNombre] = useState("");
  const [validNombre, setValidNombre] = useState(false);

  const [categoria, setCategoria] = useState("");
  const [validCategoria, setValidCategoria] = useState(false);

  const [stock, setStock] = useState("");
  const [validStock, setValidStock] = useState(false);

  const [precio, setPrecio] = useState("");
  const [validPrecio, setValidPrecio] = useState(false);

  const [idProducto, setIdProducto] = useState("");

  const NOMBRE_REGEX = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;

  const CATEGORIA_REGEX = /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  // const PWD_REGX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  useEffect(() => {
    nombreRef.current.focus();
  }, []);

  useEffect(() => {
    const result = NOMBRE_REGEX.test(nombre);
    setValidNombre(result);
  }, [nombre]);

  useEffect(() => {
    const result = CATEGORIA_REGEX.test(categoria);
    setValidCategoria(result);
  }, [categoria]);

  useEffect(() => {
    const result = stock > 0;
    setValidStock(result);
  }, [stock]);

  useEffect(() => {
    const result = precio > 0;
    setValidPrecio(result);
  }, [precio]);

  //Crea el identificador para el producto
  function generarIdProducto(nombre, categoria) {
    const nombrePartes = nombre.trim().slice(0, 3);
    const categoriaPartes = categoria.trim().slice(0, 3);
    return (nombrePartes + categoriaPartes).replace(/\s+/g, "");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIdProducto(generarIdProducto(nombre, categoria));

    setMessage("Enviando..");
    setIsError(false);

    try {
      const response = await fetch(url_create_producto, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          nombre: nombre,
          categoria: categoria,
          stock: stock,
          idProducto: idProducto,
          precio: precio,
        }),
      });

      const res = await response.json();
      console.log(res);

      if (!response.ok) {
        setMessage(
          `error al enviar el producto ${res.error || res.statusText}`
        );
        setIsError(true);
        setShowToast(true);
      } else {
        setMessage(
          `El producto ${nombre} se ha creado y enviado correctamente`
        );
        setIsError(false);
        setShowToast(true);
      }
    } catch (err) {
      console.log("error al enviar los datos", err);
      setMessage("error de conexion", err);
      setIsError(true);
      setShowToast(true);
    }
  };

  return (
    <Container>
      <header>
        <h4>Nuevo Producto</h4>
        <main className="register-container">
          <div className="register-layout">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2" controlId="formBasicNombre">
                <Form.Label>
                  Nombre:
                  <span className={validNombre ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} className="valid-icon" />
                  </span>
                  <span className={validNombre || !nombre ? "hide" : "valid"}>
                    <FontAwesomeIcon icon={faTimes} className="invalid-icon" />
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ej: Tomate"
                  ref={nombreRef}
                  autoComplete="off"
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicCategoria">
                <Form.Label>
                  Categoria:
                  <span className={validCategoria ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} className="valid-icon" />
                  </span>
                  <span
                    className={validCategoria || !categoria ? "hide" : "valid"}
                  >
                    <FontAwesomeIcon icon={faTimes} className="invalid-icon" />
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej:Verduras"
                  autoComplete="off"
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicStock">
                <Form.Label>
                  Stock:
                  <span className={validStock ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} className="valid-icon" />
                  </span>
                  <span className={validStock || !stock ? "hide" : "valid"}>
                    <FontAwesomeIcon icon={faTimes} className="invalid-icon" />
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ej: 100"
                  autoComplete="off"
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicPrecio">
                <Form.Label>
                  Precio:
                  <span className={validPrecio ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} className="valid-icon" />
                  </span>
                  <span className={validPrecio || !precio ? "hide" : "valid"}>
                    <FontAwesomeIcon icon={faTimes} className="invalid-icon" />
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ej: 100"
                  autoComplete="off"
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                disabled={
                  !validNombre || !validCategoria || !validStock || !validPrecio
                    ? true
                    : false
                }
                variant="info"
                type="submit"
              >
                Crear producto
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

export default Register;

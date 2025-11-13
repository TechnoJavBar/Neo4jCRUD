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
  const url_proveedor_consulta = "http://localhost:4000/proveedores";

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

  const [idProveedor, setIdProveedor] = useState("");
  const [validIdProveedor, setValidIdProveedor] = useState(false);
  const [proveedor, setProveedor] = useState([]);

  const [idProducto, setIdProducto] = useState("");
  const [validIdProducto, setValidIdProducto] = useState(false);

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

  useEffect(() => {
    const result = idProducto.length === 3;
    setValidIdProducto(result);
  }, [idProducto]);

  async function comprobarProveedor() {
    try {
      const response = await fetch(`${url_proveedor_consulta}/${idProveedor}`);
      const data = await response.json();

      if (!response.ok) {
        console.log("Error al consultar el proveedor");
        return null;
      } else {
        setProveedor(data);
        return data;
      }
    } catch (error) {
      console.log("Error al consultar el proveedor", error);
      return null;
    }
  }

  //Comprobar que el id de proveedor es de 4 dígitos
  useEffect(() => {
    const result = idProveedor.length === 4;
    setValidIdProveedor(result);
  }, [idProveedor]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("Enviando...");
    setIsError(false);

    // Esperar a que termine la consulta
    const proveedorData = await comprobarProveedor();

    if (proveedorData && proveedorData.length > 0) {
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
            codigoManufacturer: idProveedor,
            paisGS1: proveedorData[0].paisGS1, // ✅ ahora sí tienes los datos correctos
          }),
        });

        const res = await response.json();
        console.log(res);

        if (!response.ok) {
          setMessage(
            `Error al enviar el producto: ${res.error || res.statusText}`
          );
          setIsError(true);
        } else {
          setMessage(`El producto ${nombre} se ha creado correctamente`);
          setIsError(false);
        }
        setShowToast(true);
      } catch (err) {
        console.log("Error al enviar los datos", err);
        setMessage("Error de conexión");
        setIsError(true);
        setShowToast(true);
      }
    } else {
      console.log("El proveedor no existe");
      setMessage("El proveedor no existe");
      setIsError(true);
      setShowToast(true);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-start py-3"
      style={{
        background: "linear-gradient(135deg, #e0f7fa 0%, #f1f8e9 100%)",
        minHeight: "89vh",
      }}
    >
      <div
        className="shadow-sm rounded-4 p-3"
        style={{
          width: "100%",
          maxWidth: "640px",
          backgroundColor: "#ffffff",
          border: "1px solid #dce6e0",
        }}
      >
        <h6 className="text-center mb-3 fw-bold" style={{ color: "#00796b" }}>
          Registrar producto
        </h6>

        <Form onSubmit={handleSubmit}>
          <div className="row">
            {/* Columna izquierda */}
            <div className="col-md-6">
              <Form.Group className="mb-2" controlId="formBasicNombre">
                <Form.Label className="fw-semibold small text-teal">
                  Nombre:
                  <span className={validNombre ? "valid" : "hide"}>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="valid-icon ms-1"
                    />
                  </span>
                  <span className={validNombre || !nombre ? "hide" : "valid"}>
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="invalid-icon ms-1"
                    />
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Tomate"
                  ref={nombreRef}
                  autoComplete="off"
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="rounded-3 p-2 border-0"
                  style={{
                    backgroundColor: "#f0fdf4",
                    fontSize: "0.85rem",
                    color: "#333",
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formBasicCategoria">
                <Form.Label className="fw-semibold small text-teal">
                  Categoría:
                  <span className={validCategoria ? "valid" : "hide"}>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="valid-icon ms-1"
                    />
                  </span>
                  <span
                    className={validCategoria || !categoria ? "hide" : "valid"}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="invalid-icon ms-1"
                    />
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Verduras"
                  autoComplete="off"
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                  className="rounded-3 p-2 border-0"
                  style={{
                    backgroundColor: "#f0fdf4",
                    fontSize: "0.85rem",
                    color: "#333",
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formBasicStock">
                <Form.Label className="fw-semibold small text-teal">
                  Stock:
                  <span className={validStock ? "valid" : "hide"}>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="valid-icon ms-1"
                    />
                  </span>
                  <span className={validStock || !stock ? "hide" : "valid"}>
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="invalid-icon ms-1"
                    />
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: 100"
                  autoComplete="off"
                  onChange={(e) => setStock(e.target.value)}
                  required
                  className="rounded-3 p-2 border-0"
                  style={{
                    backgroundColor: "#f0fdf4",
                    fontSize: "0.85rem",
                    color: "#333",
                  }}
                />
              </Form.Group>
            </div>

            {/* Columna derecha */}
            <div className="col-md-6">
              <Form.Group className="mb-2" controlId="formBasicPrecio">
                <Form.Label className="fw-semibold small text-teal">
                  Precio:
                  <span className={validPrecio ? "valid" : "hide"}>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="valid-icon ms-1"
                    />
                  </span>
                  <span className={validPrecio || !precio ? "hide" : "valid"}>
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="invalid-icon ms-1"
                    />
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: 10.50"
                  autoComplete="off"
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                  className="rounded-3 p-2 border-0"
                  style={{
                    backgroundColor: "#f0fdf4",
                    fontSize: "0.85rem",
                    color: "#333",
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formBasicIdProducto">
                <Form.Label className="fw-semibold small text-teal">
                  ID producto:
                  <span className={validIdProducto ? "valid" : "hide"}>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="valid-icon ms-1"
                    />
                  </span>
                  <span
                    className={
                      validIdProducto || !idProducto ? "hide" : "valid"
                    }
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="invalid-icon ms-1"
                    />
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: 001"
                  autoComplete="off"
                  onChange={(e) => setIdProducto(e.target.value)}
                  required
                  className="rounded-3 p-2 border-0"
                  style={{
                    backgroundColor: "#f0fdf4",
                    fontSize: "0.85rem",
                    color: "#333",
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formBasicProveedor">
                <Form.Label className="fw-semibold small text-teal">
                  ID proveedor:
                  <span className={validIdProveedor ? "valid" : "hide"}>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="valid-icon ms-1"
                    />
                  </span>
                  <span
                    className={
                      validIdProveedor || !idProveedor ? "hide" : "valid"
                    }
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="invalid-icon ms-1"
                    />
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: 100"
                  autoComplete="off"
                  onChange={(e) => setIdProveedor(e.target.value)}
                  required
                  className="rounded-3 p-2 border-0"
                  style={{
                    backgroundColor: "#f0fdf4",
                    fontSize: "0.85rem",
                    color: "#333",
                  }}
                />
              </Form.Group>
            </div>
          </div>

          <div className="text-center mt-2">
            <Button
              disabled={
                !validNombre ||
                !validCategoria ||
                !validStock ||
                !validPrecio ||
                !validIdProveedor ||
                !validIdProducto
              }
              type="submit"
              className="px-4 py-2 rounded-3 border-0 text-white fw-semibold"
              style={{
                background: "linear-gradient(135deg, #26a69a, #00796b)",
                fontSize: "0.85rem",
              }}
            >
              Registrar
            </Button>
          </div>
        </Form>
      </div>

      <ToastContainer
        className="p-3"
        position="bottom-end"
        style={{ zIndex: 10 }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg={isError ? "danger" : "success"}
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto text-capitalize">
              {isError ? "Error" : "Satisfactorio"}
            </strong>
            <small>Hace un momento</small>
          </Toast.Header>
          <Toast.Body className="text-white">{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Register;

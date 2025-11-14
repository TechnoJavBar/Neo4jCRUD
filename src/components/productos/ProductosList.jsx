import { useState, useEffect, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { Table } from "react-bootstrap";

export const ProductosList = () => {
  const url_get = "http://localhost:4000/productos";
  const url_delete = "http://localhost:4000/productosDelete";

  const [producto, setProducto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isErrorDelete, setIsErrorDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(url_get);

        if (!response.ok) {
          throw new Error(
            `Error HTTP: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log(data);
        setProducto(data);
      } catch (err) {
        console.error("Fallo al cargar los productos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const filteredProductos = useMemo(() => {
    return producto.filter(
      (p) =>
        p.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.codigoEAN?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoria?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.precio?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [producto, searchTerm]);

  const handleDelete = async (producto) => {
    console.log("Eliminando producto:", producto.codigoEAN);

    try {
      const response = await fetch(`${url_delete}/${producto.codigoEAN}`, {
        method: "DELETE",
      });

      const res = await response.json();
      console.log(res);

      if (!response.ok) {
        setMessage(
          `Error al eliminar el producto ${res.error || res.statusText}`
        );
        setIsErrorDelete(true);
        setShowToast(true);
      } else {
        setMessage("El producto se ha eliminado correctamente");
        setProducto((prevProducto) =>
          prevProducto.filter((u) => u.codigoEAN !== producto.codigoEAN)
        );
        setShowToast(true);
      }
    } catch (err) {
      console.log("Error al procesar la petición", err);
      setMessage("Error de conexión");
      setIsErrorDelete(true);
      setShowToast(true);
    }
  };

  if (loading) {
    return <p>Cargando productos desde la base de datos...</p>;
  }

  if (error) {
    return (
      <div style={{ color: "red" }} className="container">
        <p>Error al conectar con la API:</p>
        <p>Detalle: {error}</p>
        <p>
          Asegúrate de que tu servidor Node.js esté corriendo en el puerto 4000.
        </p>
      </div>
    );
  }

  if (producto.length === 0) {
    return <p>No se encontraron productos en la base de datos</p>;
  }

  return (
    <main className="d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex flex-column align-items-center w-100 mt-5">
        <h2>Lista de productos</h2>

        <input
          type="text"
          className="form-control w-75 mb-4"
          placeholder="Buscar por nombre, código, categoría ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Table className="table table-striped table-hover w-75 mt-4">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Identificador</th>
              <th scope="col">Categoría</th>
              <th scope="col">precio</th>
              <th scope="col">Stock</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductos.length > 0 ? (
              filteredProductos.map((producto, index) => (
                <tr key={index}>
                  <th scope="row">{producto.nombre}</th>
                  <td>{producto.codigoEAN}</td>
                  <td>{producto.categoria}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.stock}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(producto)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No se encontraron productos
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
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
            <strong variant="me-auto">
              {isErrorDelete ? "error" : "satisfacftorio"}
            </strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body
            style={{ color: "black" }}
            className={isErrorDelete ? "Danger" : "Success"}
          >
            {message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </main>
  );
};

import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export const ProveedoresList = () => {
  const url_get_proveedores = "http://localhost:4000/proveedores";
  const [proveedores, setProveedores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchProveedores = async () => {
      try {
        const response = await fetch(url_get_proveedores);
        const data = await response.json();
        setProveedores(data);
        setIsLoading(false);
      } catch (error) {
        setMensaje(error.message);
        setIsError(true);
        setIsLoading(false);
        setShowToast(true);
      }
    };

    fetchProveedores();
  }, []);

  {
    isLoading && <p>Cargando proveedores...</p>;
  }
  {
    isError && <p>Error: {mensaje}</p>;
  }

  return (
    <main className="d-flex flex-column justify-content-center align-items-center">
      {/* Muestra los mensajes de error y exito */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">
              {isError ? "Error" : "Satisfactorio"}
            </strong>
          </Toast.Header>
          <Toast.Body>{mensaje}</Toast.Body>
        </Toast>
      </ToastContainer>

      <div className="d-flex flex-column align-items-center w-100 mt-5">
        <h2>Lista de proveedores</h2>

        <Table className="table table-striped table-hover w-75 mt-4">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Código proveedor</th>
              <th scope="col">Código país</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((proveedor, index) => (
              <tr key={index}>
                <th scope="row">{proveedor.nombre}</th>
                <td>{proveedor.codigoManufacturer}</td>
                <td>{proveedor.paisGS1}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </main>
  );
};

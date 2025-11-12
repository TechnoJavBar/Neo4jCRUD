import { useEffect, useState, useMemo } from "react";
import Table from "react-bootstrap/Table";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export const ProveedoresList = () => {
  const url_get_proveedores = "http://localhost:4000/proveedores";

  //! carga general
  const [proveedores, setProveedores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredProveedores = useMemo(() => {
    return proveedores.filter(
      (p) =>
        // Busca coincidencias en nombre, código proveedor o país
        p.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.codigoManufacturer
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        p.paisGS1?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [proveedores, searchTerm]);

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

        {/* //Buscador de proveedor */}
        <input
          type="text"
          className="form-control w-75 mb-4"
          placeholder="Buscar por nombre, código o país..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Table className="table table-striped table-hover w-75 mt-4">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Código proveedor</th>
              <th scope="col">Código país</th>
            </tr>
          </thead>
          <tbody>
            {filteredProveedores.length > 0 ? (
              filteredProveedores.map((proveedor, index) => (
                <tr key={index}>
                  <th scope="row">{proveedor.nombre}</th>
                  <td>{proveedor.codigoManufacturer}</td>
                  <td>{proveedor.paisGS1}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No se encontraron proveedores
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </main>
  );
};

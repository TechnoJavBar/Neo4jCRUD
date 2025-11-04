import React, { useState, useEffect } from "react";
import "./Home.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";

const Home = () => {
  const url_get = "http://localhost:4000/usuarios";
  const url_delete = "http://localhost:4000/usuario/delete";

  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isErrorDelete, setIsErrorDelete] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(url_get);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("Fallo al cargar los usuarios:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (user) => {
    console.log("Eliminando usuario:", user.username);
  
    try {
      const response = await fetch(`${url_delete}/${user.username}`, {
        method: "DELETE",
      });
  
      const res = await response.json();
      console.log(res);
  
      if (!response.ok) {
        setMessage(`Error al eliminar al usuario ${res.error || res.statusText}`);
        setIsErrorDelete(true);
        setShowToast(true);
      } else {
        setMessage("El usuario se ha eliminado correctamente");
        setUser((prevUsers) => prevUsers.filter((u) => u.username !== user.username));
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
    return <p>Cargando usuarios desde la base de datos...</p>;
  }

  if (error) {
    return (
      <div style={{ color: "red" }} className="container">
        <p>Error al conectar con la API:</p>
        <p>Detalle: {error}</p>
        <p>Asegúrate de que tu servidor Node.js esté corriendo en el puerto 4000.</p>
      </div>
    );
  }

  if (user.length === 0) {
    return <p>No se encontraron usuarios en la base de datos</p>;
  }

  return (
    <div className="container">
      <h2>Lista de usuarios Neo4j</h2>
      {user.map((user, index) => (
        <Card border="info" key={index} style={{ margin: "5px" }}>
          <Card.Header>{user.name}</Card.Header>
          <Card.Body>
            <Card.Title>Username: {user.username}</Card.Title>
            <Card.Text>Password: {user.password}</Card.Text>
            <Button variant="danger" onClick={() => handleDelete(user)}>
              Eliminar
            </Button>
          </Card.Body>
        </Card>
      ))}
  
      {/*Se encarga de mostrar el mensaje ya sea de error o de satisfactorio*/}
        <ToastContainer
            className='p-3'
            position='bottom-end'
            style={{zIndex: 1}}
        >
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
            <Toast.Header>
                <strong variant="me-auto">{isErrorDelete ? 'error':'satisfacftorio'}</strong>
                <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body style={{color: "black"}} className={isErrorDelete ? 'Danger':'Success'}>
                {message}
            </Toast.Body>
        </Toast>
        </ToastContainer>
    </div>
  );
};

export default Home;

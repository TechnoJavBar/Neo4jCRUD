import React from 'react'
import {useState, useEffect} from 'react'
import './Home.css'
import Card from 'react-bootstrap/Card';


const Home = () => {

    const url_get = "http://localhost:4000/usuarios";
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    useEffect(() =>{
        const fetchUsers = async () =>{
          try{
            const response = await fetch(url_get);
    
            if(!response.ok){
              throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
    
            setUser(data);
          }
          catch(err){
            console.error("Fallo al cargar los usuarios:", err);
            setError(err.message);
          }finally{
            setLoading(false);
          }
        };
    
        fetchUsers();
      },[]);
    
      if(loading){
        return(<p>Cargando usuarios desde la base de datos...</p>);
      }
    
      if(error){
        return(
        <div style={{color: 'red'}} className='container'>
          <p>Error al conectar con la api:</p>
          <p>Detalle: {error}</p>
          <p>Asegurese de que tu servidor Node.js esté corriendo en **puerto 4000**.</p>
        </div>
        );
      };
    
      if(user.length === 0){
        return(<p>No se encontraron usuarios en la base de datos</p>)
      }
      return (
        <div className='container'>
          <h2>Lista de usuarios Neo4j</h2>
            {user.map((user, index) =>(
             <Card border="info" key={index} style={{margin: "5px"}}>
                <Card.Header>
                  {user.name}
                </Card.Header>
                <Card.Body>
                  <Card.Title>Username: {user.username}</Card.Title>
                  <Card.Text>password: {user.password}</Card.Text>
                </Card.Body>
              </Card> 
            ))}
        </div>
      )
}

export default Home
import React, {useState} from 'react'

export function CreateUser() {
    const url_create_user = "http://localhost:4000/api/usuario";

    const [name,setName] = useState('');
    const [age, setAge] = useState('');

    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault();

        setMessage("Enviando..");
        setIsError(false);

        if(!name || !age){
            setMessage("Por favor rellene todos los campos");
            setIsError(true);
            return;
        }

        try{
            const response = await fetch(url_create_user, {
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({
                    nombre:name,
                    edad: age,
                }),
            });

            const result = await response.json();

            if(!response.ok){
                setMessage(`Error al crear al usuario ${result.error || result.statusText}`);
                setIsError(true);
            }
            else{
                setMessage(`usuario ${name} creado correctamente`);
                setIsError(false);

                setAge='';
                setName='';
            }
        }
        catch(err){
            console.error('Error de red/conexion ',err);
            setMessage(' Error de conexion con el servidor');
            setIsError(true);
        }
    }
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
            <h3>➕ Crear Nuevo Usuario</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Edad:</label>
                    <input 
                        type="number" 
                        value={age} 
                        onChange={(e) => setAge(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Guardar en Neo4j</button>
            </form>

            {/* Mostrar el mensaje de feedback */}
            {message && (
                <p style={{ color: isError ? 'red' : 'green', marginTop: '15px', fontWeight: 'bold' }}>
                    {message}
                </p>
            )}
        </div>
  )
}

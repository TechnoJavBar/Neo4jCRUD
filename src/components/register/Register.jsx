import React from 'react'
import './Register.css'
import { useState, useRef, useEffect } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import  Toast  from 'react-bootstrap/Toast'
import ToastContainer  from 'react-bootstrap/ToastContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'


const Register = () => {
    const nameRef = useRef();

    const url_create_user = "http://localhost:4000/usuario/create";
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const [showToast, setShowToast] = useState(false);

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);

    const [user, setUser] = useState('');
    const [validUserName, setValidUserName] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const NAME_REGEX = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;

    const USER_REGEX = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    const PWD_REGX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    useEffect(()=>{
        nameRef.current.focus();

    },[])

    useEffect(()=>{
        const result = NAME_REGEX.test(name);
        setValidName(result);
    },[name])

    useEffect(()=>{
        const result = USER_REGEX.test(user);
        setValidUserName(result);
    },[user])

    useEffect(()=>{
        const result = PWD_REGX.test(pwd);
        setValidPwd(result);

        const match = pwd === matchPwd;
        setValidMatch(match);

    },[pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("Enviando..");
        setIsError(false);

        try{
            const response = await fetch(url_create_user, {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    nombre:name,
                    usuario:user,
                    password:pwd,
                }),
            });

            const res = await response.json();
            console.log(res);

            if(!response.ok){
                setMessage(`error al enviar al usuario ${res.error || res.statusText}`);
                setIsError(true);
                setShowToast(true);
            }
            else{
                setMessage(`El usuario ${name} se ha creado y enviado correctamente`);
                setIsError(false);
                setShowToast(true);
            }
        }
        catch(err){
            console.log('error al enviar los datos', err);
            setMessage('error de conexion', err);
            setIsError(true);
            setShowToast(true);
        }
    }

  return (
    <Container>
        <header>
            <h4>Register</h4>
            <main className='register-container'>
                <div className='register-layout'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-2' controlId='formBasicName'>
                            <Form.Label>Name:
                                <span className={validName?"valid":"hide"}>
                                    <FontAwesomeIcon icon={faCheck} className='valid-icon'/>
                                </span>
                                <span className={validName || !name ?'hide':'valid'}>
                                    <FontAwesomeIcon icon={faTimes} className='invalid-icon'/>
                                </span>
                            </Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter name'
                                ref={nameRef}
                                autoComplete='off'
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='mb-2' controlId='formBasicUsername'>
                            <Form.Label>Username:
                                <span className={validUserName?"valid":"hide"}>
                                    <FontAwesomeIcon icon={faCheck} className='valid-icon'/>
                                </span>
                                <span className={validUserName || !user ?'hide':'valid'}>
                                    <FontAwesomeIcon icon={faTimes} className='invalid-icon'/>
                                </span>
                            </Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter username'
                                autoComplete='off'
                                onChange={(e) => setUser(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='mb-2' controlId='formBasicPassword'>
                            <Form.Label>Password:
                                <span className={validPwd?"valid":"hide"}>
                                    <FontAwesomeIcon icon={faCheck} className='valid-icon'/>
                                </span>
                                <span className={validPwd || !pwd ?'hide':'valid'}>
                                    <FontAwesomeIcon icon={faTimes} className='invalid-icon'/>
                                </span>
                            </Form.Label>
                            <Form.Control 
                                type='password' 
                                placeholder='Enter password'
                                autoComplete='off'
                                onChange={(e) => setPwd(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='mb-2' controlId='formBasicConfirmPassword'>
                            <Form.Label>Confirm Password:
                                <span className={validMatch && matchPwd?"valid":"hide"}>
                                    <FontAwesomeIcon icon={faCheck} className='valid-icon'/>
                                </span>
                                <span className={validMatch || !matchPwd ?'hide':'valid'}>
                                    <FontAwesomeIcon icon={faTimes} className='invalid-icon'/>
                                </span>
                            </Form.Label>
                            <Form.Control 
                                type='password' 
                                placeholder='Confirm password'
                                autoComplete='off'
                                onChange={(e) => setMatchPwd(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button disabled = {!validName || !validUserName || !validPwd || !validMatch ? true : false} variant='info' type='submit'>
                            Submit
                        </Button>
                    </Form>
                </div>
            </main>
        </header>
        {/*Se encarga de mostrar el mensaje ya sea de error o de satisfactorio*/}
        <ToastContainer
            className='p-3'
            position='bottom-end'
            style={{zIndex: 1}}
        >
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
            <Toast.Header>
                <strong className="me-auto">{isError ? 'error':'satisfacftorio'}</strong>
                <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body style={{color: "black"}} className={isError ? 'Danger':'Success'}>
                {message}
            </Toast.Body>
        </Toast>
        </ToastContainer>
    </Container>
  )
}

export default Register
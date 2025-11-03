import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './components/home/Home.jsx'
import Layout from './components/Layout.jsx'
import Header from './components/header/Header.jsx'
import Register from './components/register/Register.jsx'

function App() {

  return(
    <div className='app'>
      <Header/>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App

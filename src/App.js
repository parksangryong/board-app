//최상위
import './App.css';
import Header from './components/Header';
import Board from './components/Board';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import NewLogin from './components/NewLogin';
import LogModi from './components/LogModi';
import { useState } from 'react';

function App() {
  const [logon, setLogon] = useState(false)
 

  return (
    <div id="App">
      <Header logon={logon} />
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Board logon={logon} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/newlogin' element={<NewLogin />} />
          <Route path='/logmodify' element={<LogModi />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

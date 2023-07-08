//최상위
import './App.css';
import Header from './components/Header';
import Board from './components/Board';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import NewLogin from './components/NewLogin';
import LogModi from './components/LogModi';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  //console.log(isLoggedIn)

  return (
    <div id="App">
      <Header logon={isLoggedIn} />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path='/*' element={<Board logon={isLoggedIn} />} />
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

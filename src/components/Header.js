//로그인, 게시판, 회원가입으로 이동(-App)
import '../css/Header.css'
import logo from '../images/logo-board.png'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../_reducer/action'

function Header (){
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const hname = useSelector((state) => state.id)

    const logoutid = () => {
        dispatch(logout());
        window.location.href ='/'
      };
    

    if(isLoggedIn){
        return(
            <div id='header'>
                <div className='logo'>
                    <a href='/'><img src={logo} alt='logo' /></a>
                </div>
                <div id='hello'>
                    {hname} 님 환영합니다
                </div>
                <div className='movelog'>
                         <button onClick={() => window.location.href = '/logmodify'}>modify</button>
                        <button onClick={logoutid}>logout</button>
                </div>
            </div>
        )
    }
    else{
        return(
            <div id='header'>
                <div className='logo'>
                    <a href='/'><img src={logo} alt='logo' /></a>
                </div>
                <div className='movelog'>
                        <button onClick={() => window.location.href = '/newlogin'}>new</button>
                        <button onClick={() => window.location.href = '/login'}>login</button>
                </div>
            </div>
        )
    }
    
}

export default Header
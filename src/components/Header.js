//로그인, 게시판, 회원가입으로 이동(-App)
import '../css/Header.css'
import logo from '../images/logo-board.png'

function Header (props){
    if(props.logon){
        return(
            <div id='header'>
                <div className='logo'>
                    <a href='/'><img src={logo} alt='logo' /></a>
                </div>
                <div className='movelog'>
                         <button onClick={() => window.location.href = '/logmodify'}>modify</button>
                        <button>logout</button>
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
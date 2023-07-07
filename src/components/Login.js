//로그인 컴포넌트(-App)
import { useState } from 'react'
import '../css/Login.css'

function Login (props){
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')

    const submitbtn = () => {
        
    }

    return(
        <div id='login'>
            <div className='login-div'>
                <h2>로그인</h2>
                <div className='login-id'>
                <span>ID : </span><input type='text' value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                <div className='login-pass'>
                <span>password : </span><input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='login-btn'>
                <button onClick={submitbtn} >로그인</button>
                </div>
                <hr />
                <div className='login-txt'>로그인을 해주십시오.</div>
            </div>
        </div>
    )
}

export default Login
//회원정보 수정
import '../css/LogModi.css'
import { useState } from 'react';

function LogModi(props){
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const submitbtn = () => {

    }

    const deletebtn = () => {
        
    }

    return(
        <div id='log-modi'>
        <div className='modi-div'>
                <h2>회원정보 수정</h2>
                <div className='modi-id'>
                <span>ID : </span><input type='text' value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                <div className='modi-pass'>
                <span>password : </span><input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='modi-name'>
                <span>NickName : </span><input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='modi-btn'>
                <button onClick={submitbtn}>저장</button>
                <button onClick={deletebtn}>삭제</button>
                </div>
                <hr />
                <div className='modi-txt'>회원정보를 수정해주세요</div>
            </div>
        </div>
    )
}

export default LogModi
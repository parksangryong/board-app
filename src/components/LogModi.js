//회원정보 수정
import '../css/LogModi.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../_reducer/action'
import axios from 'axios';

function LogModi(props){
    const [id, setId] = useState(useSelector((state) => state.id));
    const [password, setPassword] = useState(useSelector((state) => state.password));
    const [name, setName] = useState(useSelector((state) => state.username));
    const dispatch = useDispatch();


    const submitbtn = async () => {
        alert('다시 로그인해주세요')
        window.location.href = '/'
        dispatch(logout())

        const changeObj = {id: id, username: name, password: password}
        const result = await axios.put('/id', changeObj);
        console.log(result)     
    }

    const deletebtn = async () => {
        alert('회원이 삭제되었습니다')
        window.location.href = '/'
        dispatch(logout())
        
        const result = await axios.delete('/id', {data : {id}})
        console.log(result)   
    }

    return(
        <div id='log-modi'>
        <div className='modi-div'>
                <h2>회원정보 수정</h2>
                <div className='modi-id'>
                <span>ID : </span><input type='text' value={id} readOnly />
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
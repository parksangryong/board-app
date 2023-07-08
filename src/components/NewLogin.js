//회원가입(-App)
import '../css/NewLogin.css'
import { useState } from 'react';
import axios from 'axios';

function NewLogin (){
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const submitbtn = async () => {
        //console.log(id, password, name)
        const loginObj = {id: id, username: name, password: password}

        try{
            const result = await axios.post('/id', loginObj)
            console.log(result)
        }
        catch(error){
            alert('id')
        }
        
        window.location.href = '/'
    }

    return(
        <div id='new-login'>
            <div className='new-div'>
                <h2>회원가입</h2>
                <div className='new-id'>
                <span>ID : </span><input type='text' value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                <div className='new-pass'>
                <span>password : </span><input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='new-name'>
                <span>NickName : </span><input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='new-btn'>
                <button onClick={submitbtn}>회원가입</button> 
                </div>
                <hr />
                <div className='new-txt'>아이디가 중복됩니다.</div>
            </div>
        </div>
    )
}

export default NewLogin
// 게시물 추가(-Board)
import { useEffect, useState } from 'react'
import '../css/PostForm.css'
import axios from 'axios'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux';

function PostForm (){
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userid, setUserid] = useState(useSelector((state) => state.id))
    const [date, setDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'))

    useEffect(
        () => {
            getBoard();
        }, []
    )

    const getBoard = async () => {
        const result = await axios.get('/board');
        console.log(result.data);

        if(result.data.length == 0){
            setId(1)
        }else{
            setId(result.data[0].id + 1)
        }
    }

    const addBoard = async() => {
        window.location.href = '/'

        const boardObj = ({id : id, title : title, content : content, user_id : userid, w_date : date})

        console.log(boardObj)

        const result = await axios.post('/board', boardObj)
        console.log(result)
    }

    return(
        <div id='post-form'>
            <div className='form'>
                <div className='form-id'>
                    <span>id: </span> <input type='text' value={id} readOnly />
                </div>
                <div className='form-title'>
                    <span>title: </span> <input type='text' onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='form-content'>
                    <span>content: </span> <textarea rows={5} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <div className='form-user'>
                    <span>user_id: </span> <input type='text' value={userid} readOnly />
                </div>
                <div className='form-date'>
                    <span>date: </span> <input type='text' value={date} readOnly />
                </div>
                <button className='form-btn' onClick={addBoard}>저장</button>
            </div>
            
        </div>
    )
}

export default PostForm
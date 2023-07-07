//게시물 상세보기, 수정, 삭제(-PostList)
import { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import '../css/PostItem.css'
import queryString from 'query-string'

function PostItem (){
    const [board, setBoard] = useState([])
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(
        () => {
            const queryObj =  queryString.parse(window.location.search);
            const id = queryObj.query
            //console.log(id)

            getBoardItem(id);
            //console.log(board)

        }, [board]
    )

    const getBoardItem = async (id) => {
       const result = await axios.get('/num/'+ id);
        //console.log(result.data);

        board.push({id : result.data[0].id, title : result.data[0].title, content : result.data[0].content, user_id : result.data[0].user_id,
            w_date : dayjs(result.data[0].w_date).format('YYYY-MM-DD')})

        setTitle(result.data[0].title)
        setContent(result.data[0].content)
        //console.log(board)
    }

    const modify = async () => {

        if(edit){
            const queryObj =  queryString.parse(window.location.search);
            const id = queryObj.query

            window.location.href = '/postitem?query=' + id

            const boardObj = {id : board[0].id, title: title, content: content}
            console.log(boardObj)

            const result = await axios.put('/board', boardObj)
            console.log(result.data);
        }

        setEdit(!edit)
    }

    const deleteBoard = async () => {
        window.location.href = '/'

        const id = board[0].id
        const result = await axios.delete('/board', {data : {id}})
        console.log(result)
    }
    

if(board[0]){
    if(edit){
        return(
            <div id='post-item'>
                <div className='form'>
                    <div className='form-id'>
                        <span>id: </span> <input type='text' defaultValue={board[0].id} readOnly />
                    </div>
                    <div className='form-title'>
                        <span>title: </span> <input type='text' defaultValue={board[0].title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='form-content'>
                        <span>content: </span> <textarea rows={5} defaultValue={board[0].content} onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>
                    <div className='form-user'>
                        <span>user_id: </span> <input type='text' defaultValue={board[0].user_id} readOnly />
                    </div>
                    <div className='form-date'>
                        <span>date: </span> <input type='text' defaultValue={board[0].w_date} readOnly />
                    </div>
                    <button className='form-btn' onClick={modify}>저장</button>
                    <button className='delete-btn' onClick={deleteBoard}>삭제</button>
                </div>
            </div>
        )
    }
    else{
        return(
            <div id='post-item'>
                <div className='form'>
                <div className='form-id'>
                        <span>id: </span> <input type='text' defaultValue={board[0].id} readOnly />
                    </div>
                    <div className='form-title'>
                        <span>title: </span> <input type='text' defaultValue={board[0].title}  readOnly />
                    </div>
                    <div className='form-content'>
                        <span>content: </span> <textarea rows={5} defaultValue={board[0].content} readOnly></textarea>
                    </div>
                    <div className='form-user'>
                        <span>user_id: </span> <input type='text' defaultValue={board[0].user_id} readOnly />
                    </div>
                    <div className='form-date'>
                        <span>date: </span> <input type='text' defaultValue={board[0].w_date} readOnly />
                    </div>
                    <button className='form-btn' onClick={modify}>수정</button>
                </div>
            </div>
        )
    }
}
else{
    return(
        <div id='post-item'>
           불러오는 중...
           <button className='open-btn' onClick={modify}>새로고침</button>
        </div>
    )
}
    
}

export default PostItem
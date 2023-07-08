//게시판 컴포넌트(-App)
import '../css/Board.css'
import {Routes, Route } from 'react-router-dom';
import PostList from './PostList'
import PostForm from './PostForm';
import PostItem from './PostItem';
import {useSelector } from 'react-redux';
import { useState } from 'react';

function Board (){
    const [id, setId] = useState(useSelector((state) => state.id))

    const addBoard = () => {   
        if(id){
            window.location.href = '/postform'
        }else{
            alert('로그인 해주세요')
        }
    }

    return(
        <div id='board'>
            <button onClick={addBoard}>글쓰기</button>
            <div className='board-title'>전체 게시글</div>
                <Routes>
                    <Route path='/' element={<PostList />} />
                    <Route path='/postform' element={<PostForm />} />
                    <Route path='/postitem/*' element={<PostItem />} />
                </Routes>
        </div>
    )
}

export default Board
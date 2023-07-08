//게시물 목록 조회(-Board)
import '../css/PostList.css'
import Post from './Post'
import { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import Pagenation from './Pagenation'

function PostList (){
    const [board, setBoard] = useState([])
    const [allboard, setAllboard] = useState([])
    const [page, setPage] = useState(6)
    const [current, setCurrent] = useState(1)

    useEffect(
        () => {
            getBoard()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [current]
    )

    const getBoard = async () => {
        const result = await axios.get('/board');
        //console.log(result.data);

        setAllboard(result.data);
        setPage(6)

        let postObj = [];

        for(var i=(current-1)*page; i<page*current; i++){
            // 0 - 6, 6 - 12
            if(result.data[i]){
                postObj.push({id : result.data[i].id, title : result.data[i].title, content : result.data[i].content, user_id : result.data[i].user_id,
                    w_date : dayjs(result.data[i].w_date).format('YYYY-MM-DD')})
            }
        }
        setBoard(postObj)
    } 

    if(board){
        var result = board.map(
            (data) => (<Post key={data.id} id={data.id} title={data.title} content={data.content} user_id={data.user_id} w_date={data.w_date} />)
        )
    }
    else{
        result = 'not data'
    }

    const movePage = (index) => {
        setCurrent(index)
    }
     

    return(
        <div id='post-list'>
            {result}
            <Pagenation page={page} current={current} all = {allboard.length} movePage={movePage} />
        </div>
    )
}

export default PostList
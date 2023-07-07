//게시물 
import '../css/Post.css'

function Post (props){
    const moveitem = () => {
        const id = props.id
        window.location.href = '/postitem?query=' + id
    }

    return(
        <div id='post' onClick={moveitem}>
            <div className='post-id'>
                <span>{props.id}</span>
            </div>
            <div className='post-title'>
                <span>{props.title}</span>
            </div>
            <div className='post-userid'>
                <span>{props.user_id}</span>
            </div>
            <div className='post-date'>
                <span>{props.w_date}</span>
            </div>
        </div>
    )
}

export default Post
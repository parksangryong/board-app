//게시물 목록 조회(-Board)
import '../css/PostList.css'

function Pagenation (props){
    const page = props.page
    //6
    const current = props.current
    //1
    const all = props.all
    //13
    const endpage = Math.ceil(all/page)
    //3

    //console.log(page, current, all ,endpage)

    let pages = []

    if(current >= 6 && endpage >= current+4){
        for(var i=current-4; i<=current+4; i++){
            pages.push(i)
        }
    }else{
        for(var i=1; i<=endpage; i++){
            pages.push(i)
        }
    }

    const result = pages.map(
        (data) => (<span key={data} className='pagenumber' id={current === data? 'active' : ''} onClick={() => movePage(data)} >{data}</span>)
    )
     
    const movePage = (data) => {
        //console.log(data)
        props.movePage(data)
    }

     const prev = () => {

        if(current-1 < 1){
            alert('이동불가!');
            return
        }

        props.movePage(current-1)
    }


    const next = () => {
        if(current+1 > endpage){
            alert('이동불가!');
            return
        }
        props.movePage(current+1)
    }	

    return(
        <div id='pagenation'>
            <button onClick={prev}>&lt;</button>
                    {result}
            <button onClick={next}>&gt;</button>
        </div>
    )
}

export default Pagenation
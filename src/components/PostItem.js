//게시물 상세보기, 수정, 삭제(-PostList)
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "../css/PostItem.css";
import queryString from "query-string";
import { useSelector } from "react-redux";
import Answer from "./Answer";

function PostItem() {
  const [board, setBoard] = useState([]);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userid, setUserid] = useState(useSelector((state) => state.id));

  useEffect(() => {
    const queryObj = queryString.parse(window.location.search);
    const id = queryObj.query;

    getBoardItem(id);
  }, [board]);

  const getBoardItem = async (id) => {
    const result = await axios.get(
      "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/num/" + id
    );
    //console.log(result.data);

    board.push({
      id: result.data[0].id,
      title: result.data[0].title,
      content: result.data[0].content,
      user_id: result.data[0].user_id,
      w_date: dayjs(result.data[0].w_date).format("YYYY-MM-DD"),
    });

    setTitle(result.data[0].title);
    setContent(result.data[0].content);
    //console.log(board)
  };

  const modify = async () => {
    if (edit && board[0].user_id === userid) {
      const queryObj = queryString.parse(window.location.search);
      const id = queryObj.query;

      window.location.href = "/postitem?query=" + id;

      const boardObj = { id: board[0].id, title: title, content: content };
      console.log(boardObj);

      const result = await axios.put(
        "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/board",
        boardObj
      );
      console.log(result.data);
    } else if (board[0].user_id !== userid) {
      alert("다른 사용자입니다.");
      return;
    }

    setEdit(!edit);
  };

  const deleteBoard = async () => {
    window.location.href = "/";

    const id = board[0].id;
    const result = await axios.delete(
      "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/board",
      { data: { id } }
    );
    console.log(result);
  };

  if (board[0]) {
    if (edit) {
      return (
        <div id="post-item">
          <div className="form">
            <div className="form-id">
              <span>user_id: &nbsp;{board[0].user_id} </span>
              <span>date: &nbsp;{board[0].w_date}</span>
            </div>
            <div className="form-title">
              <span>title: </span>{" "}
              <input
                type="text"
                defaultValue={board[0].title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-content">
              <textarea
                rows={5}
                defaultValue={board[0].content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            <button className="form-btn" onClick={modify}>
              저장
            </button>
            <button className="delete-btn" onClick={deleteBoard}>
              삭제
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div id="post-item">
          <div className="form">
            <div className="form-id">
              <span>user_id: &nbsp;{board[0].user_id} </span>
              <span>date: &nbsp;{board[0].w_date}</span>
            </div>
            <div className="form-title">
              <span>title: </span>{" "}
              <input type="text" defaultValue={board[0].title} readOnly />
            </div>
            <div className="form-content">
              <textarea
                rows={5}
                defaultValue={board[0].content}
                readOnly
              ></textarea>
            </div>

            <button className="form-btn" onClick={modify}>
              수정
            </button>
          </div>

          <div className="answer-txt">
            <h3>댓글</h3>
            <Answer id={board[0].id} />
          </div>
        </div>
      );
    }
  } else {
    return (
      <div id="post-item">
        불러오는 중...
        <button className="open-btn" onClick={modify}>
          새로고침
        </button>
      </div>
    );
  }
}

export default PostItem;

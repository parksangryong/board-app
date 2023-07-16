//게시물 목록 조회(-Board)
import "../css/PostList.css";
import Post from "./Post";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Pagenation from "./Pagenation";
import queryString from "query-string";

function PostList() {
  const [board, setBoard] = useState([]);
  const [allboard, setAllboard] = useState([]);
  const page = 6;
  const [current, setCurrent] = useState(1);
  const [opt, setOpt] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getBoard();
    //console.log(opt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, opt]);

  const getBoard = async () => {
    const queryObj = queryString.parse(window.location.search);
    const name = queryObj.query;

    //console.log(name);
    if (opt === "title" && search) {
      try {
        //console.log(search);

        let result = await axios.get(
          "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/title/" +
            search
        );
        setAllboard(result.data);

        let postObj = [];

        for (var i = (current - 1) * page; i < page * current; i++) {
          // 0 - 6, 6 - 12
          if (result.data[i]) {
            postObj.push({
              id: result.data[i].id,
              title: result.data[i].title,
              content: result.data[i].content,
              user_id: result.data[i].user_id,
              w_date: dayjs(result.data[i].w_date).format("YYYY-MM-DD"),
            });
          }
        }
        setBoard(postObj);
      } catch (err) {
        alert(err);
      }
    } else if (opt === "date" && search) {
      try {
        //console.log(search);
        let result = await axios.get(
          "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/date/" +
            search
        );
        setAllboard(result.data);
        let postObj = [];

        for (var i = (current - 1) * page; i < page * current; i++) {
          // 0 - 6, 6 - 12
          if (result.data[i]) {
            postObj.push({
              id: result.data[i].id,
              title: result.data[i].title,
              content: result.data[i].content,
              user_id: result.data[i].user_id,
              w_date: dayjs(result.data[i].w_date).format("YYYY-MM-DD"),
            });
          }
        }
        setBoard(postObj);
      } catch (err) {
        alert(err);
      }
    } else if (name) {
      let result = [];

      result = await axios.get(
        "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/name/" +
          name
      );
      //console.log(result.data);

      setAllboard(result.data);
      let postObj = [];

      for (var i = (current - 1) * page; i < page * current; i++) {
        // 0 - 6, 6 - 12
        if (result.data[i]) {
          postObj.push({
            id: result.data[i].id,
            title: result.data[i].title,
            content: result.data[i].content,
            user_id: result.data[i].user_id,
            w_date: dayjs(result.data[i].w_date).format("YYYY-MM-DD"),
          });
        }
      }
      setBoard(postObj);
    } else {
      result = await axios.get(
        "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/board"
      );
      //console.log(result.data);

      setAllboard(result.data);
      let postObj = [];

      for (var i = (current - 1) * page; i < page * current; i++) {
        // 0 - 6, 6 - 12
        if (result.data[i]) {
          postObj.push({
            id: result.data[i].id,
            title: result.data[i].title,
            content: result.data[i].content,
            user_id: result.data[i].user_id,
            w_date: dayjs(result.data[i].w_date).format("YYYY-MM-DD"),
          });
        }
      }
      setBoard(postObj);
    }
  };

  if (board) {
    var result = board.map((data) => (
      <Post
        key={data.id}
        id={data.id}
        title={data.title}
        content={data.content}
        user_id={data.user_id}
        w_date={data.w_date}
      />
    ));
  } else {
    result = "not data";
  }

  const movePage = (index) => {
    setCurrent(index);
  };

  const moveSearch = async () => {
    if (opt === "title" || opt === "date") {
      getBoard();
    } else {
      alert("다시 검색해주세요.");
      return;
    }
  };

  return (
    <div id="post-list">
      {result}
      <Pagenation
        page={page}
        current={current}
        all={allboard.length}
        movePage={movePage}
      />

      <div className="fixed">
        &nbsp;&nbsp;&nbsp;
        <select onChange={(e) => setOpt(e.target.value)}>
          <option value="">Default</option>
          <option value="title">제목</option>
          <option value="date">날짜</option>
        </select>
        &nbsp;&nbsp;
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <div onClick={moveSearch}>검색</div>
      </div>
    </div>
  );
}

export default PostList;

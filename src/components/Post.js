//게시물
import { useState, useEffect } from "react";
import "../css/Post.css";
import axios from "axios";

function Post(props) {
  const [an, setAn] = useState("");

  const moveitem = () => {
    const id = props.id;
    window.location.href = "/postitem?query=" + id;
  };

  useEffect(() => {
    getAnswer();
  }, []);

  const getAnswer = async () => {
    const result = await axios.get(
      `https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/answer/` +
        props.id
    );
    //console.log(result.data);
    setAn(result.data.length);
  };

  return (
    <div id="post" onClick={moveitem}>
      <div className="post-id">
        <span>{props.id}</span>
      </div>
      <div className="post-title">
        <span>{props.title}</span>
      </div>
      <div className="post-userid">
        <span>{props.user_id}</span>
      </div>
      <div className="post-date">
        <span>{props.w_date}</span>
      </div>
    </div>
  );
}

export default Post;

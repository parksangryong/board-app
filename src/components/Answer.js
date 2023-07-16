import "../css/Answer.css";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import AnswerItem from "./AnswerItem";

function Answer(props) {
  const [userid, setUserid] = useState(useSelector((state) => state.id));
  const [answerlist, setAnswerlist] = useState([]);
  const [answer, setAnswer] = useState("");
  const [id, setId] = useState("");
  const date = dayjs(new Date()).format("YYYY-MM-DD");

  useEffect(() => {
    getAnswer();
  }, [answerlist]);

  const getAnswer = async () => {
    const result = await axios.get(
      `https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/answer/` +
        props.id
    );
    //console.log(result.data);
    setAnswerlist(result.data);

    const alllen = await axios.get(
      `https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/allanswer`
    );

    //console.log(alllen);
    if (alllen.data.length == 0) {
      setId(1);
    } else {
      setId(alllen.data[0].id + 1);
      //console.log(id);
    }
  };

  const result = answerlist.map((data, index) => (
    <AnswerItem key={index} alist={data} />
  ));

  const addAnswer = async () => {
    if (userid) {
      const postObj = {
        id: id,
        board_id: props.id,
        date: date,
        answer: answer,
        name: userid,
      };

      //console.log(postObj);

      const result = await axios.post(
        `https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/answer`,
        postObj
      );
      console.log(result);

      setAnswer("");
    } else {
      alert("로그인해주세요");
      return;
    }
  };

  return (
    <div id="answer">
      <div className="answer-input">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <div onClick={addAnswer}>쓰기</div>
      </div>
      {result}
    </div>
  );
}

export default Answer;

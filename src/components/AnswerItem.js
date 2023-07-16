import "../css/AnswerItem.css";
import dayjs from "dayjs";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

function AnswerItem(props) {
  const [edit, setEdit] = useState(false);
  const [userid, setUserid] = useState(useSelector((state) => state.id));
  const [answer, setAnswer] = useState(props.alist.answer);

  const dates = dayjs(props.alist.date).format("YYYY-MM-DD");

  const updateAnswer = async () => {
    if (props.alist.name === userid) {
      if (edit) {
        const id = props.alist.id;

        const upObj = { id: id, answer: answer };

        const result = await axios.put(
          `https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/answer`,
          upObj
        );
        console.log(result);

        setEdit(!edit);
      }
      setEdit(!edit);
    } else {
      alert("다른 아이디 입니다.");
      return;
    }
  };
  const deleteAnswer = async () => {
    if (props.alist.name === userid) {
      const id = props.alist.id;
      const result = await axios.delete(
        `https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/answer`,
        { data: { id } }
      );
      console.log(result);
    } else {
      alert("다른 아이디 입니다.");
      return;
    }
  };

  if (edit) {
    return (
      <div id="answer-item">
        <div className="an-name">{props.alist.name}</div>

        <div className="an-date">{dates}</div>
        <div className="an-mo" onClick={updateAnswer}>
          저장
        </div>
        <div className="an-del" onClick={deleteAnswer}>
          삭제
        </div>
        <hr />
        <div className="an-an">
          <textarea
            defaultValue={answer}
            onChange={(e) => setAnswer(e.target.value)}
          ></textarea>
        </div>
      </div>
    );
  } else {
    return (
      <div id="answer-item">
        <div className="an-name">{props.alist.name}</div>

        <div className="an-date">{dates}</div>
        <div className="an-mo" onClick={updateAnswer}>
          수정
        </div>
        <div className="an-del" onClick={deleteAnswer}>
          삭제
        </div>
        <hr />
        <div className="an-an">{props.alist.answer}</div>
      </div>
    );
  }
}

export default AnswerItem;

import "../css/Answer.css";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import AnswerItem from "./AnswerItem";

function Answer(props) {
  const [userid, setUserid] = useState(useSelector((state) => state.id));
  const [answerlist, setAnswerlist] = useState([]);

  useEffect(() => {
    getAnswer();
  }, []);

  const getAnswer = async () => {
    const result = await axios.get(
      `https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/answer/` +
        props.id
    );
    //console.log(result.data);
    setAnswerlist(result.data);
  };

  const result = answerlist.map((data, index) => (
    <AnswerItem key={index} alist={data} />
  ));

  return <div id="answer">{result}</div>;
}

export default Answer;

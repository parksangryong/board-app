//회원가입(-App)
import "../css/NewLogin.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../_reducer/action";
import axios from "axios";

function NewLogin() {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("직장인");

  const submitbtn = async () => {
    //console.log(id, password, name)
    const loginObj = { id: id, username: name, password: password };

    if (!id) {
      return alert("이름을 입력하세요.");
    } else if (!password) {
      return alert("Password를 입력하세요.");
    } else if (!name) {
      return alert("소속을 입력하세요.");
    } else {
      try {
        const result = await axios.post(
          "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/id",
          loginObj
        );
        //console.log(result.data)
        if (result.data.message === "회원가입 성공") {
          setMsg("회원가입 성공입니다.");
          dispatch(login(name, id));
          window.location.href = "/";
        } else {
          setMsg(result.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div id="new-login">
      <div className="new-div">
        <h2>회원가입</h2>
        <div className="new-id">
          <span>이름 : </span>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="new-pass">
          <span>암호 : </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="new-name">
          <span>소속 : </span>
          <select onChange={(e) => setName(e.target.value)}>
            <option value="직장인">직장인</option>
            <option value="대학생">대학생</option>
          </select>
        </div>
        <div className="new-btn">
          <button onClick={submitbtn}>회원가입</button>
        </div>
        <hr />
        {msg && <div className="new-txt">{msg}</div>}
      </div>
    </div>
  );
}

export default NewLogin;

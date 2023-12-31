//회원정보 수정
import "../css/LogModi.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../_reducer/action";
import axios from "axios";

function LogModi() {
  const [id, setId] = useState(useSelector((state) => state.id));
  const [name, setName] = useState(useSelector((state) => state.username));
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const submitbtn = async () => {
    if (!password) {
      return alert("비밀번호를 입력하세요.");
    } else if (!name) {
      return alert("소속을 선택하세요.");
    }
    alert("다시 로그인해주세요");
    window.location.href = "/";
    dispatch(logout());

    const changeObj = { id: id, username: name, password: password };
    const result = await axios.put(
      "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/id",
      changeObj
    );
    console.log(result);
  };

  const deletebtn = async () => {
    if (!password) {
      return alert("비밀번호를 입력하세요.");
    } else {
      if (window.confirm("정말 삭제합니까?")) {
        alert("회원이 삭제되었습니다");
        window.location.href = "/";
        dispatch(logout());

        const result = await axios.delete(
          "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/id",
          { data: { id } }
        );
        console.log(result);
      } else {
        alert("취소합니다.");
        return;
      }
    }
  };

  return (
    <div id="log-modi">
      <div className="modi-div">
        <h2>회원정보 수정</h2>
        <div className="modi-id">
          <span>이름 : </span>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="modi-pass">
          <span>암호 : </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="modi-name">
          <span>소속 : </span>
          <select onChange={(e) => setName(e.target.value)}>
            <option value="직장인">직장인</option>
            <option value="대학생">대학생</option>
          </select>
        </div>
        <div className="modi-btn">
          <button onClick={submitbtn}>저장</button>
          <button onClick={deletebtn}>삭제</button>
        </div>
        <hr />
        <div className="modi-txt">삭제시, 비밀번호를 입력해야합니다.</div>
      </div>
    </div>
  );
}

export default LogModi;

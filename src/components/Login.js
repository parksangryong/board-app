//로그인 컴포넌트(-App)
import { useState, useEffect } from "react";
import "../css/Login.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../_reducer/action";

function Login() {
  const dispatch = useDispatch();
  const [ids, setIds] = useState([]);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getIds();
    //console.log(isLoggedIn)
  }, [msg]);

  const getIds = async () => {
    const result = await axios.get(
      "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/id"
    );
    setIds(result.data);
    //console.log(ids)
  };

  const submitbtn = async () => {
    if (!id) {
      return alert("ID를 입력하세요.");
    } else if (!password) {
      return alert("Password를 입력하세요.");
    } else {
      try {
        const result = await axios.post(
          "https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/login",
          { id, password }
        );
        console.log(result.data);
        if (result.data.success) {
          setMsg("로그인 성공");
          const names = ids.filter((data) => data.id === id);
          const namex = names[0].username;
          const idx = names[0].id;

          dispatch(login(namex, idx));
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
    <div id="login">
      <div className="login-div">
        <h2>로그인</h2>
        <div className="login-id">
          <span>ID : </span>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="login-pass">
          <span>password : </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-btn">
          <button onClick={submitbtn}>로그인</button>
        </div>
        <hr />
        {msg && <div className="login-txt">{msg}</div>}
      </div>
    </div>
  );
}

export default Login;

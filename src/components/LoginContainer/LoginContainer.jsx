import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

const LoginContainer = ({ username, password }) => {
  const navigate = useNavigate();
  const [userName, setuserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const emailOnChange = (e) => {
    setuserName(e.target.value);
  };

  const passwordOnChange = (e) => {
    setUserPassword(e.target.value);
  };

  const submitHandler = async () => {
    setErrorMsg("");
    if (userName === "admin@bukapedia.com" && userPassword === "admin123") {
      navigate("../admin");
      setErrorMsg("");
      localStorage.setItem("token", "admin");
      return;
    }

    if (userName === username && userPassword === password) {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://fakestoreapi.com/auth/login",
          {
            username: userName,
            password: userPassword,
          }
        );
        setErrorMsg("");
        setLoading(false);
        const getToken = response?.data?.token;
        localStorage.setItem("token", getToken);
        setToken(getToken);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
    if (
      userName !== username ||
      userPassword !== password ||
      userName !== "admin@bukapedia.com" ||
      userPassword !== "admin123"
    ) {
      setErrorMsg("Invalid username or password!");
      setuserName("");
      setUserPassword("");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="form-control mx-auto w-full max-w-xs">
        <label className="label">
          <span className="label-text">Username:</span>
        </label>
        <input
          type="text"
          placeholder={username}
          className="input input-bordered w-full max-w-xs"
          onChange={emailOnChange}
        />
      </div>
      <div className="form-control mx-auto w-full max-w-xs">
        <label className="label">
          <span className="label-text">Password:</span>
        </label>
        <input
          type="password"
          placeholder={password}
          className="input input-bordered w-full"
          onChange={passwordOnChange}
        />
      </div>
      <div className="form-control mx-auto w-full max-w-xs">
        <button onClick={submitHandler} className="btn btn-success text-white">
          Login
        </button>
      </div>
      {errorMsg && <p className="text-center text-red-500">{errorMsg}</p>}
      {loading && <Loading />}
    </div>
  );
};

export default LoginContainer;

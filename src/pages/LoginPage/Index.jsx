import { useEffect } from "react";
import LoginContainer from "../../components/LoginContainer/LoginContainer";
import useTitle from "../../hooks/useTitle";
import { getUser } from "../../redux/reducers/getUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";

const LoginPage = () => {
  useTitle("Login | Bukapedia");
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPage = () => {
      const token = localStorage.getItem("token");
      if (token) {
        return navigate("/");
      }
    };
    redirectPage();
  }, [navigate]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { username, password } = useSelector((state) => state.user);

  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Login</h1>
      <LoginContainer username={username} password={password} />
    </div>
  );
};

export default LoginPage;

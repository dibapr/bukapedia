import LoginContainer from "../../components/LoginContainer/LoginContainer";
import useTitle from "../../hooks/useTitle";

const LoginPage = () => {
  useTitle("Login | Bukapedia");
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Login</h1>
      <LoginContainer />
    </div>
  );
};

export default LoginPage;

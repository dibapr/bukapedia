import Stock from "../../components/Admin/Stock";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useTitle from "../../hooks/useTitle";

const Admin = () => {
  useTitle("Admin | Bukapedia");

  const navigate = useNavigate();
  const token = localStorage.token;

  useEffect(() => {
    if (!token) {
      return navigate("../login");
    }
    if (token !== "admin") {
      return navigate("/");
    }
  }, [token]);

  return <Stock />;
};

export default Admin;

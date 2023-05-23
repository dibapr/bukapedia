import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";

const SalesRecapPage = () => {
  useTitle("Sales Recap | Bukapedia");

  const token = localStorage.token;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate("../../login");
    }
    if (token !== "admin") {
      return navigate("/");
    }
  }, [token]);

  return <h1>Sales Recap Page</h1>;
};

export default SalesRecapPage;

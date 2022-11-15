import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "../../Components/UserList/UserList";
const Home = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  useEffect(() => {
    console.log("useEffect ~ token", token);
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="customDiv">
      <UserList />
    </div>
  );
};

export default Home;

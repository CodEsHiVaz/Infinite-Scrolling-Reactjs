import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isLogut, setislogout] = useState(false);
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  useEffect(() => {
    console.log("useEffect ~ token", token);
    if (!token) {
      setislogout(false);
    }
  }, [token]);
  const handelLogOut = () => {
    localStorage.removeItem("token");
    setislogout(true);
    navigate("/login");
  };
  return (
    <div className={styles.navbar}>
      <Link to="/">Home</Link>
      {token ? (
        <button onClick={handelLogOut}>Logout</button>
      ) : (
        <Link to="/login">login</Link>
      )}
    </div>
  );
};

export default Navbar;

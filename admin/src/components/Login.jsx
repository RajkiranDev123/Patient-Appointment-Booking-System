import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axiosInstance from "../services/setupAxios";
import TestCredentials from "./TestCredentials";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password || !email) {
      toast.error("All field are required!")
      return
    }
    try {
      await axiosInstance
        .post(
          `${import.meta.env.VITE_API_BURL}/api/v1/user/login`,
          { email, password, role: "Admin" },
          {
 
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          localStorage.setItem("accessToken",res.data.token)
          localStorage.setItem("refreshToken",res.data.refreshToken)

          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail("");
          setPassword("");

        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section className="container form-component">

        <h1 style={{ color: "grey" }} className="form-title">WELCOME TO Raj Medical!</h1>
        <p>Only Admins Are Allowed!</p>
        <TestCredentials/>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button style={{ background: "green" }} type="submit">Login</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
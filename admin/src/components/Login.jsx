import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axiosInstance from "../services/setupAxios";
import TestCredentials from "./TestCredentials";
import "./loader.css"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);



  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password || !email) {
      toast.error("All field are required!")
      return
    }
    try {
      setLoading(true)
      await axiosInstance
        .post(
          `${import.meta.env.VITE_API_BURL}/api/v1/user/login`,
          { email, password, role: "Admin" },
          {

            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          localStorage.setItem("accessToken", res.data.token)
          localStorage.setItem("refreshToken", res.data.refreshToken)

          toast.success(res.data.message);
          setIsAuthenticated(true);
          setLoading(false)
          navigateTo("/");
          setEmail("");
          setPassword("");

        });
    } catch (error) {
      setLoading(false)

      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section className="container form-component">

        <img src="/reception.png" alt="kjhg" style={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          width: 250, height: 250, borderRadius: 290
        }} />

        <h1 style={{ color: "grey" }} className="form-title">WELCOME TO Raj Medical!</h1>
        <p style={{ fontWeight: "bold" }}>Only Admins Are Allowed!</p>
        <TestCredentials />
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
            <button style={{ background: "green" }} type="submit">
              {loading ? <div style={{ display: "flex", justifyContent: "center" }}><div className="loader"></div></div> : "Login"}

            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
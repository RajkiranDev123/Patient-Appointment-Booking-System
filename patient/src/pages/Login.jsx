import axiosInstance from "../services/setupAxios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";
import TestCredentials from "./TestCredentials"
import "../pages/loader.css"
const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required!")
      return
    }
    try {
      setLoading(true)
      await axiosInstance
        .post(
          `/api/v1/user/login`,
          { email, password, role: "Patient" },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          localStorage.setItem("accessToken", res.data.token)
          localStorage.setItem("refreshToken", res.data.refreshToken)
          toast.success(res.data.message);
          setIsAuthenticated(true);
          setEmail("");
          setPassword("");
          setLoading(false)
          navigateTo("/");


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
      <div className="container form-component login-form">
        <h2 style={{ color: "grey" }}>Sign In</h2>
        <p>Please Login To Continue</p>

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

          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Not Registered?</p>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "red" }}
            >
              Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button style={{ background: "green" }} type="submit">
              {loading ? <div style={{ display: "flex", justifyContent: "center" }}><div className="loader"></div></div> : "Login"}

            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
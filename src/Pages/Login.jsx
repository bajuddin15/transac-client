import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/validate";
import { toast } from "react-toastify";
import { AppState } from "../AppContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { userInfo, setUserInfo } = AppState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(email)) {
      toast.error("Please write valid email.");
      return;
    } else {
      const formData = {
        email,
        password,
      };
      console.log(formData);
      try {
        const { data } = await axios.post(
          "https://transac-project-server.onrender.com/user/login",
          formData
        );
        localStorage.setItem("firstName", data?.firstName);
        localStorage.setItem("lastName", data?.lastName);
        localStorage.setItem("email", data?.email);
        localStorage.setItem("token", data?.token);
        setUserInfo(data);
        console.log(data, "khan..........");
        toast.success("Login successfully");
        navigate("/");
      } catch (error) {
        toast.warning("Something went wrong");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      navigate("/");
    }
  }, []);

  return (
    <div className="mt-10 md:mt-0 md:h-screen  flex md:items-center justify-center">
      <div className="flex flex-col gap-8 bg-white border border-gray-200 rounded-lg shadow min-w-full md:min-w-[500px] p-6">
        <h4 className="text-xl text-center font-bold text-slate-700">
          Welcome to Login
        </h4>
        <form action="" className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="p-2"
              placeholder="john@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-lg">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="p-2"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-slate-700 text-white text-lg font-bold uppercase rounded-lg py-2 mt-3 hover:bg-slate-600">
            {loading ? "Please wait.." : "Login"}
          </button>
          <p className="text-slate-700">
            Don't have an account{" "}
            <Link
              to="/register"
              className="ml-2 text-md underline text-sky-600">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

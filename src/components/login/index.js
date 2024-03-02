import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Oval } from "react-loader-spinner";
import { MainContainer } from "./styledComponents";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [apiStatus, setApiStatus] = useState(apiConstants.initial);

  const toastOptions = {
    autoClose: 2000,
    style: {
      background: "#0f172a",
      color: "#fff",
    },
  };

  const renderLoader = () => {
    return (
      <Oval
        visible={true}
        height="100%"
        width="25"
        color="#fff"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    );
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
  };

  const formValidation = () => {
    const { email, password } = formData;

    const isEmailValid = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(email);
      return isValidEmail;
    };

    if (isEmailValid(email) === false) {
      toast.warn("Invalid Email", { ...toastOptions });
      return false;
    } else if (password === "") {
      toast.warn("Invalid password", { ...toastOptions });
      return false;
    }

    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formValidation()) {
      setApiStatus(apiConstants.inProgress);
      try {
        const apiUrl = "http://localhost:5000/login";
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        };

        const response = await fetch(apiUrl, options);
        const fetchedData = await response.json();
        if (response.ok) {
          const token = fetchedData.jwtToken;
          Cookies.set("chatToken", token, { expires: 7 });
          setApiStatus(apiConstants.success);
          toast.success("Login Successfull !", { ...toastOptions });
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          const message = fetchedData.message;
          toast.error(message, { ...toastOptions });
          setApiStatus(apiConstants.failure);
        }
      } catch (error) {
        toast.error("Error while login", { ...toastOptions });
        console.log("Error while login", error);
        setApiStatus(apiConstants.failure);
      }
    }
  };

  return (
    <MainContainer>
      <div className="card-container">
        <div className="logo-container">
          <p>ConnectMe</p>
        </div>
        <form onSubmit={handleFormSubmit}>
          <p>Login</p>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="youremail@example.com"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              placeholder="password"
            />
          </div>
          <button type="submit">
            {apiStatus === apiConstants.inProgress
              ? renderLoader()
              : "Account Login"}
          </button>
        </form>
        <p className="already-have-account-login">
          Don't have an account ?{" "}
          <Link to="/register" style={{ textDecoration: "none" }}>
            <span style={{ color: "#7ca1f3", fontWeight: 600 }}>Register</span>
          </Link>
        </p>
      </div>
      <ToastContainer />
    </MainContainer>
  );
}

import { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Oval } from "react-loader-spinner";

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

const MainContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: #0f172a;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  @media screen and (min-width: 576px) {
    justify-content: center;
  }

  .card-container {
    background-color: #0f172a;
    padding: 10px;
    width: 100%;
  }

  .card-container .already-have-account-login {
    font-size: 16px;
    text-align: center;
    color: #fff;
    padding: 10px;
  }

  .logo-container {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo-container p {
    color: #ffffff;
    font-size: 30px;
    font-weight: 500;
  }

  form {
    background-color: #132036;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 10px;
    margin-top: 20px;
  }

  form p {
    font-size: 20px;
    color: #ffffff;
    font-weight: 500;
  }

  form div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  form div label {
    display: block;
    color: #94a3b8;
  }

  form div input {
    height: 60px;
    padding: 9px 16px;
    width: 100%;
    font-size: 16px;
    border: 1px solid #203047;
    background: #132036 !important;
    border-radius: 5px;
    outline: none;
    color: #94a3b8;
    font-weight: 500;
  }

  form div input::placeholder {
    color: #94a3b8;
  }

  form .privacy-policy-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
  }

  form .privacy-policy-container input {
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  form .privacy-policy-container p {
    color: #94a3b8;
    font-size: 14px;
  }

  form .privacy-policy-container span {
    color: #7ca1f3;
  }

  form button {
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #2563eb;
    padding: 8px 16px;
    font-size: 15px;
    font-weight: 500;
    color: #fff;
    margin-top: 15px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  form button:hover {
    background-color: #779edc;
  }

  @media screen and (min-width: 576px) {
    .card-container {
      width: 540px;
    }
  }

  @media screen and (min-width: 768px) {
    .card-container {
      width: 738px;
    }

    form div {
      width: 100%;
    }
  }
`;

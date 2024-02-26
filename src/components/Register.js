import { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    privacyChecked: false,
  });

  const toastOptions = {
    autoClose: 2000,
    style: {
      background: "#0f172a",
      color: "#fff",
    },
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
  };

  const formValidation = () => {
    const { name, email, password, passwordRepeat, privacyChecked } = formData;

    const isNameValid = (name) => {
      const isNameValid = /^[a-zA-Z]{3,20}$/.test(name);
      return isNameValid;
    };

    const isEmailValid = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(email);
      return isValidEmail;
    };

    const isPasswordValid = (password) => {
      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasDigit = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
      const isLengthValid = password.length >= 8;

      return (
        hasLowercase &&
        hasUppercase &&
        hasDigit &&
        hasSpecialChar &&
        isLengthValid
      );
    };

    if (isNameValid(name) === false) {
      toast.warn("Valid Name is required. Name should not contain space", {
        ...toastOptions,
        autoClose: 3000,
      });
      return false;
    } else if (isEmailValid(email) === false) {
      toast.warn("Valid Email is required", { ...toastOptions });
      return false;
    } else if (isPasswordValid(password) === false) {
      toast.warn(
        "Password should contain alphabets in both case, numbers & symbols ",
        { ...toastOptions, autoClose: 5000 }
      );
      return false;
    } else if (passwordRepeat === "") {
      toast.warn("Valid Password repeat is required", { ...toastOptions });
      return false;
    } else if (password !== passwordRepeat) {
      toast.warn("Passwords do not match", { ...toastOptions });
      return false;
    } else if (privacyChecked === false) {
      toast.warn("Agree with privacy policy", { ...toastOptions });
      return false;
    }

    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formValidation()) {
      toast.success("Registration Successfull !", { ...toastOptions });
    }
  };

  return (
    <MainContainer>
      <div className="card-container">
        <div className="logo-container">
          <p>ConnectMe</p>
        </div>
        <form onSubmit={handleFormSubmit}>
          <p>Create Account</p>
          <div id="firstGroup">
            <div>
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="yourname"
              />
            </div>
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
          </div>
          <div id="secondGroup">
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
            <div>
              <label htmlFor="passwordRepeat">Password Repeat</label>
              <input
                id="passwordRepeat"
                type="password"
                name="passwordRepeat"
                value={formData.passwordRepeat}
                onChange={handleFormChange}
                placeholder="password again"
              />
            </div>
          </div>
          <div className="privacy-policy-container">
            <input
              type="checkbox"
              value={formData.privacyChecked}
              onChange={() => {
                setFormData((prevData) => ({
                  ...prevData,
                  privacyChecked: !prevData.privacyChecked,
                }));
              }}
            />
            <p>
              I agree with <span>privacy policy & terms</span>
            </p>
          </div>
          <button type="submit">Account Register</button>
        </form>
        <p className="already-have-account-login">
          Already have an account ?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            <span style={{ color: "#7ca1f3", fontWeight: 600 }}>Login</span>
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
  }

  form button:hover {
    background-color: #779edc;
  }

  @media screen and (min-width: 576px) {
    .card-container {
      width: 540px;
    }

    #firstGroup {
      display: flex;
      flex-direction: row;
    }

    #secondGroup {
      display: flex;
      flex-direction: row;
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

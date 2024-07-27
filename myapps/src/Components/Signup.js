import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

function SignUp() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const validatePassword = () => {
    setIsPasswordValid(password.length >= 6);
  };

  const signup = (e) => {
    e.preventDefault();

    // Validate email and password before making the API request
    validateEmail();
    validatePassword();

    if (!isEmailValid) {
      alert("Please enter a valid email address");
      return;
    }

    if (!isPasswordValid) {
      alert("Password must be at least 6 characters long");
      return;
    }

    axios
      .post("/auth/signup", { email, password, fullName })
      .then((res) => {
        alert(res.data.message);
        alert("Signup successful!"); // Add this line for success alert
        navigate("/login");
      })
      .catch((err) => console.warn(err));
  };

  return (
    <Container>
      <Logo>
        <img src="./amazon_logo.png" alt="Amazon Logo" />
      </Logo>
      <FormContainer>
        <h3>Create account</h3>
        <InputContainer>
          <p>Your name</p>
          <input
            type="text"
            placeholder="John Smith"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
        </InputContainer>
        <InputContainer>
          <p>Email</p>
          <input
            type="email"
            placeholder="example@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
              // Reset email validation when the user types
              setIsEmailValid(true);
            }}
            onBlur={validateEmail}
            value={email}
            style={!isEmailValid ? { border: "1px solid red" } : {}}
          />
          {!isEmailValid && (
            <ValidationMessage>Please enter a valid email address</ValidationMessage>
          )}
        </InputContainer>
        <InputContainer>
          <p>Password</p>
          <input
            type="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
            value={password}
            style={!isPasswordValid ? { border: "1px solid red" } : {}}
          />
          {!isPasswordValid && (
            <ValidationMessage>Password must be at least 6 characters long</ValidationMessage>
          )}
        </InputContainer>

        <SignUpButton onClick={signup}>Create your Amazon account</SignUpButton>
        <InfoText>
          By creating an account, you agree to Amazon's <span>Conditions of Use</span> and{" "}
          <span>Privacy Notice</span>.
        </InfoText>
      </FormContainer>

      <LoginButton onClick={() => navigate("/login")}>
        Already have an account? Sign-In
      </LoginButton>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.div`
  width: 100%;
  max-width: 200px;
  margin-bottom: 20px;

  img {
    width: 100%;
  }
`;

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  h3 {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;

  p {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    height: 40px;
    padding: 10px;
    border: 1px solid #a88734;
    border-radius: 3px;
  }
`;

const SignUpButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #f0c14b;
  border: 1px solid #a88734;
  border-radius: 3px;
  color: #111;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #ddb347;
  }
`;

const InfoText = styled.p`
  font-size: 12px;
  margin-top: 15px;

  span {
    color: #0066c0;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
  color: #111;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const ValidationMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

export default SignUp;

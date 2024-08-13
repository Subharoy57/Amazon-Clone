// Login.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useStateValue } from '../StateProvider';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [{}, dispatch] = useStateValue();

  const login = (e) => {
    e.preventDefault();

    // Hardcoded admin credentials
    const adminEmail = 'subharoy2500@gmail.com';
    const adminPassword = 'subharoy2500'; 

    if (email === adminEmail && password === adminPassword) {
      // Simulate a successful login for admin
      dispatch({
        type: 'SET_USER',
        user: { email: adminEmail, isAdmin: true },
      });

      localStorage.setItem('user', JSON.stringify({ email: adminEmail, isAdmin: true }));

      // Alert for successful login
      alert('Admin Login successful!');
      navigate('/addproduct'); 
    } else {
      // Perform the usual login with the backend for regular users
      axios
        .post('/auth/login', { email, password })
        .then((res) => {
          if (!res.data.error) {
            dispatch({
              type: 'SET_USER',
              user: res.data,
            });

            localStorage.setItem('user', JSON.stringify(res.data));

            // Alert for successful login
            alert('Login successful!');
            navigate('/');
          } else if (res.data.error) {
            alert(res.data.error);
          }
        })
        .catch((err) => console.warn(err));
    }
  };

  return (
    <Container>
      <Logo src="amazon_logo.png" alt="Amazon Logo" />
      <FormContainer>
        <h3>Sign-In</h3>
        <InputContainer>
          <p>Email</p>
          <input
            type="email"
            placeholder="example@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <p>Password</p>
          <input
            type="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </InputContainer>
        <LoginButton onClick={login}>Sign-In</LoginButton>
        <InfoText>
          By continuing, you agree to Amazon's{' '}
          <span>Conditions of Use </span>
          and <span> Privacy Notice</span>
        </InfoText>
      </FormContainer>
      <SignUpButton onClick={() => navigate('/signup')}>
        Create your Amazon Account
      </SignUpButton>
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

const Logo = styled.img`
  width: 100%;
  max-width: 200px;
  margin-bottom: 20px;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;

  p {
    font-size: 14px;
    font-weight: 600;
  }

  input {
    width: 100%;
    height: 40px;
    margin-top: 5px;
    padding: 10px;
    border: 1px solid #a88734;
    border-radius: 3px;
  }
`;

const LoginButton = styled.button`
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
  }
`;

const SignUpButton = styled.button`
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

export default Login;


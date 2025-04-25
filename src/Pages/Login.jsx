import React, { useContext } from 'react';
import '../Styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Contexts/UserContext';

const Login = () => {
  const { setUserLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email: e.target.email.value,
      password: e.target.password.value
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      }
    };

    try {
      const response = await axios.post("/user/login", data, axiosConfig);
      console.log(response.data);
      setUserLoggedIn(true); // Update the global login state
      navigate("/"); // Navigate to the home page after login
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
    }

    e.target.reset();
  };

  return (
    <section id='login_section'>
      <div id='login_form'>
        <form action='' onSubmit={onSubmit}>
          <p id='form_title'>Sign In</p>
          <div className='inpts'>
            <input type="email" name='email' placeholder='email Id' />
          </div>
          <div className='inpts'>
            <input type="password" name='password' placeholder='password' />
          </div>
          <div className='inpts btn1'>
            <button>
              Sign In
            </button>
            <p id='signupop'>
              Don’t have an account?&nbsp;
              <Link to='/signup' className='sgnlink'>Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
      <div id='login_imgdiv'>
        <p>Welcome back to</p>
        <div>UnchainedIP</div>
      </div>
    </section>
  );
};

export default Login;
import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "../../Styles/Navbar.css";
import userimg from '../../assets/userSVG.svg';
import { UserContext } from '../../Contexts/UserContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out..."); // Show loading toast

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      }
    };

    try {
      const response = await axios.get("/user/logout", {}, axiosConfig);
      console.log(response.data + " logged out successfully");
      setUserLoggedIn(false); // Update the global login state
      toast.update(toastId, {
        render: "Logged out successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate("/"); // Navigate to the home page after logout
    } catch (err) {
      console.error(err);
      toast.update(toastId, {
        render: "Logout failed. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <ToastContainer /> {/* Ensure this is included to render toasts */}
      <div id='nav_sec'>
        <div id='nav_d1'>
          <p>OriginMark</p>
        </div>
        <div id='nav_d2'>
          <ul>
            <li>
              <NavLink to='/' className={({ isActive }) => ` ${isActive ? "navActiveLink" : "navLink"}`}>Home</NavLink>
            </li>
            <li>
              <NavLink to='/create' className={({ isActive }) => `navLink ${isActive ? "navActiveLink" : "navLink"}`}>Create</NavLink>
            </li>
            <li>
              <NavLink to='/verify' className={({ isActive }) => `navLink ${isActive ? "navActiveLink" : "navLink"}`}>Verify</NavLink>
            </li>
            <li>
              <NavLink to='/about' className={({ isActive }) => `navLink ${isActive ? "navActiveLink" : "navLink"}`}>About Us</NavLink>
            </li>
          </ul>
        </div>
        {
          userLoggedIn ? (
            <div id='nav_d4'>
              <Link to='/user' id='nav_d3'>
                <img src={userimg} alt="User Profile" id='user_profile_img' />
              </Link>
              <button onClick={handleLogout} className='logout_btn'>
                Logout
              </button>
            </div>
          ) : (
            <div id='nav_d4'>
              <Link to='/login' className='l1'>
                Log In
              </Link>
              <Link to='/signup' className='l2'>
                <div>Sign Up</div>
              </Link>
            </div>
          )
        }
      </div>
    </>
  );
};

export default Navbar;
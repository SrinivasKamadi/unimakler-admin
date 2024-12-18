import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearUser } from "../store/slices/UserSlice";
const Header = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    dispatch(clearUser());
    navigation('/');
  };

  return (
    <>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="navbar-logo-box">
            <span className="logo-sm">
              <a href="/">
              <img src="/assets/images/logomain.png" alt="logos" width={100} />
              </a>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

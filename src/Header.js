import React from "react";
import googledrivelogo from "./assets/googledrivelogo.png";
import "./css/Header.css";
import SearchIcon from "@material-ui/icons/Search";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import AppsIcon from "@material-ui/icons/Apps";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const Header = ({ user }) => {
  console.log(user?.photoURL);
  return (
    <div className="header">
      <div className="header__logo">
        <img src={googledrivelogo} alt="googledrivelogo" className="" />
        <span>Drive</span>
      </div>
      <div className="header__search">
        <SearchIcon />
        <input type="search" placeholder="Search in Drive" />
        <FormatAlignCenterIcon />
      </div>
      <div className="header__icons">
        <span>
          <HelpOutlineIcon />
          <SettingsIcon />
        </span>
        <span>
          <AppsIcon />
          {user ? (
            <img
              src={user?.photoURL}
              alt="profilePic"
              style={{ width: 30, borderRadius: "50%" }}
            />
          ) : (
            <AccountCircleIcon />
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Logo({ logoSource }) {
  return (
    <div className="site-logo">
      <Link to="/">
        <img src={logoSource} alt="Brave Chat" />
      </Link>
    </div>
  );
}

export default Logo;

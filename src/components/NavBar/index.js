import React from "react";
import Logo from "./Logo";
import "./style.css";
import GitHubButton from "react-github-btn";

const NavBar = () => {
  return (
    <header className="landing-header">
      <div className="inner-container">
        <nav className="inner-nav-bar">
          <Logo logoSource={"./logo.png"} />
          <ul className="nav-bar-ul">
            <li className="nav-item">
              <div className="nav-github-btn">
                <GitHubButton
                  data-color-scheme="dark: dark;"
                  href="https://github.com/brave-chat/client"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Star us on GitHub"
                >
                  Star us on GitHub
                </GitHubButton>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;

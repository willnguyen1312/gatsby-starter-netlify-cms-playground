import React from "react";
import { Link } from "gatsby";
import {
  Codefight,
  Codewars,
  Facebook,
  Github,
  HackerRank,
  Linkedin,
} from "../img";

const Navbar = class extends React.Component {
  componentDidMount() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach((el) => {
        el.addEventListener("click", () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle("is-active");
          $target.classList.toggle("is-active");
        });
      });
    }
  }

  render() {
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            {/* Hamburger menu */}
            <div className="navbar-burger burger" data-target="navMenu">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-start has-text-centered">
              <Link className="navbar-item" to="/">
                Posts
              </Link>
              <Link className="navbar-item" to="/about">
                About
              </Link>
              <Link className="navbar-item" to="/contact">
                Contact
              </Link>
              <a
                className="navbar-item"
                href="http://eepurl.com/geHUrz"
                target="_blank"
                rel="noopener noreferrer"
              >
                Subscribe
              </a>
            </div>
            <div className="navbar-end has-text-centered">
              <a
                className="navbar-item"
                href="https://github.com/willnguyen1312"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <Github width="24" height="24" fill="#181717" />
                </span>
              </a>

              <a
                className="navbar-item"
                href="https://www.linkedin.com/in/wadejohnson131292/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <Linkedin width="24" height="24" fill="#0077B5" />
                </span>
              </a>

              <a
                className="navbar-item"
                href="https://www.facebook.com/nam.nguyen.node.92"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <Facebook width="24" height="24" fill="#3B5998" />
                </span>
              </a>

              <a
                className="navbar-item"
                href="https://www.codewars.com/users/nam.nguyen.code/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <Codewars width="24" height="24" fill="#AD2C27" />
                </span>
              </a>

              <a
                className="navbar-item"
                href="https://www.hackerrank.com/nam_nguyen_node"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <HackerRank width="24" height="24" fill="#2EC866" />
                </span>
              </a>

              <a
                className="navbar-item"
                href="https://app.codesignal.com/profile/nam_nguyen_node"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <Codefight width="24" height="24" fill="#58A3F8" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;

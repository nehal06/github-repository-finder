import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = ({ name }) => {
  return (
    <nav>
      <div className="nav-wrapper">
        <ul>
          <li>
            <Link to="/">
              <i className="fab fa-github left" />
              {name}
            </Link>
          </li>
        </ul>
        <ul className="right">
          <li>
            <Link to="/" className="white-text">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="white-text">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  name: 'Git'
};
export default Navbar;

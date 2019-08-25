import React from 'react';
const Navbar = ({ name }) => {
  return (
    <nav>
      <div className="nav-wrapper">
        <ul>
          <li>
            <a href="#">
              <i className="fab fa-github left" />
              {name}
            </a>
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

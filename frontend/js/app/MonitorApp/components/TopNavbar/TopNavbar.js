import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import '../../../../../sass/components/topNavbar.scss';

const TopNavbar = () => {
  const { login } = context;

  return (
    <nav className="top-navbar">
      <ul>
        <li>
          <span className="brand">
            <Link to="/">
              Mo
              <strong>
                <i>git</i>
              </strong>
              or
            </Link>
          </span>
        </li>
        <li>
          <NavLink activeClassName="active" className="nav-link" exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" className="nav-link" exact to="/commits">
            Commits List
          </NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <span>{login}</span>
        </li>
        <li className="logout">
          <span>
            <a href="/logout">Logout</a>
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default TopNavbar;

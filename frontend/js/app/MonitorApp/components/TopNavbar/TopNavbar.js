import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './style.scss';

const TopNavbar = () => {

  return (
    <nav className="top-navbar">
      <ul>
        <li>
          <span className="brand">
            <Link to="/">Mo<strong><i>git</i></strong>or</Link>
          </span>
        </li>
        <li>
          <NavLink
            exact
            activeClassName="active"
            className="nav-link"
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            activeClassName="active"
            className="nav-link"
            to="/commits"
          >
            Commits List
          </NavLink>

        </li>
      </ul>
      <ul>
        <li>
          <span>
            { context.login }
          </span>
        </li>
        <li className="logout">
          <span>
            <a href="/logout">Logout</a>
          </span>
        </li>
      </ul>
    </nav>
  );

}

export default TopNavbar;

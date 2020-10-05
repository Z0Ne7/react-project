import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <a href="/" className="navbar-brand">
            Component
          </a>
          <ul className="nav navbar-nav">
            <li className="active">
              <a href="/">Trang chủ</a>
            </li>
            <li>
              <a href="/">Danh mục</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;

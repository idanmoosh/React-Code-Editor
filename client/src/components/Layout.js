import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../styles/layout.css';

export function Layout() {
  return (
    <div>
      <header className='layoutContainer'>
        <h1 className='layoutTitle'>Mentoring console</h1>
        <nav>
          <ul>
            <li>
              <Link to='/' className='layoutLink'>
                Lobby
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
      <footer>
        <p>
          website created by{' '}
          <a href='https://www.linkedin.com/in/idan-haim-fs/'> Idan Haim</a>
        </p>
      </footer>
    </div>
  );
}

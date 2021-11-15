/* navbar on each page */

import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">music mates</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item d-lg-none">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item d-lg-none">
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>

                        {isAuthenticated &&
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link">Profile</Link>
                            </li>
                        }
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Search
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <Link to="/artistsearch" className="dropdown-item">By Artist</Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <Link to="/albumsearch" className="dropdown-item">By Album</Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <Link to="/tracksearch" className="dropdown-item">By Track</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {isAuthenticated && <div>
                        <span className="mx-4">Welcome, {user.name}</span>
                        <LogoutButton />
                    </div>}
                    {!isAuthenticated && <LoginButton />}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
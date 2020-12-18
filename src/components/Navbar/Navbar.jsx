import React from 'react';

import { Link, NavLink } from 'react-router-dom';

import Logo from '../../assets/images/logo.svg';

import './Navbar.scss';

const Navbar = () => {

    const isLogin = false;

    return (
        <header className="navbar-custom navbar navbar-dark bg-dark" >
            <div className="container">
                <Link to="/" className="navbar-brand" >
                    <img src={Logo} alt="Logo Task Manager" />
                </Link>

                <div className="d-flex">
                    {!isLogin ?
                        (
                            < NavLink to="/ingresar" className="btn_ btn-dark m-0" >Ingresar</NavLink>
                        )
                        :
                        (
                            <>
                                <button className="button" >
                                    Crear tarea
                                </button>

                                <button className="button">
                                    Cerrar Sesión
                               </button>
                            </>
                        )
                    }
                </div>
            </div>
        </header>
    );
};

export default Navbar;
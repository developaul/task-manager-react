import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

import { auth } from '../../firebase';

import Logo from '../../assets/images/logo.svg';

import './Navbar.scss';

const Navbar = ({ firebaseUser, history }) => {

    const cerrarSesion = () => {
        auth.signOut()
            .then(() => {
                history.push('/');
            });
    };

    return (
        <header className="navbar-custom navbar navbar-dark bg-dark" >
            <div className="container">
                <Link to="/" className="navbar-brand" >
                    <img src={Logo} alt="Logo Task Manager" />
                </Link>

                <div className="d-flex">
                    {!firebaseUser ?
                        (
                            <NavLink to="/ingresar" className="btn_ btn-dark m-0" >Ingresar</NavLink>
                        )
                        :
                        (
                            <>
                                <NavLink to="/tareas" className="btn_ btn-dark m-0 ml-5 mr-3">Tareas</NavLink>

                                <button
                                    className="btn_ btn-dark m-0"
                                    onClick={cerrarSesion}
                                >
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

export default withRouter(Navbar);
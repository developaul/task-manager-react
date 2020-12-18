import React from 'react'

import { Link } from 'react-router-dom';

import './Login.scss';

const Login = () => {
    return (
        <div className="login form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email:</label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password:</label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            className="btn_ btn-primario btn-block"
                            type="submit"
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>

                <Link
                    className="enlace-cuenta"
                    to="/registrar"
                >
                    Obtener una Cuenta
                </Link>
            </div>
        </div>
    );
};

export default Login;
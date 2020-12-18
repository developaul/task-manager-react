import React from 'react';

import { Link } from 'react-router-dom';

import './Registry.scss';

const Registry = () => {
    return (
        <div className="registry form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una Cuenta</h1>

                <form>
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre:</label>

                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu Nombre"
                        />
                    </div>

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
                        <label htmlFor="confirmar">Confirmar Password:</label>

                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu Password"
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            className="btn_ btn-primario btn-block"
                            type="submit"
                            value="Registrarme"
                        />
                    </div>
                </form>

                <Link
                    className="enlace-cuenta"
                    to="/ingresar"
                >
                    Volver a Iniciar Sesión
                </Link>
            </div>
        </div >
    );
};

export default Registry;
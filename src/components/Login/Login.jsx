import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import useForm from '../../hooks/useForm';

import './Login.scss';

const Login = () => {

    const [{ email, password }, handleInputChange, handleInputReset] = useForm({
        email: '',
        password: ''
    });

    const handleSubmit = e => {
        e.preventDefault();

        // Validar campos
        if (!email.trim()) return toast.error('📧 El Email es obligatorio!');
        if (!password.trim()) return toast.error('🔑 La Contraseña es obligatoria!');

        // Enviar Formulario
        console.info("I'm in");

        // Resetear Formulario
        handleInputReset();
    };

    return (
        <div className="login form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email:</label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password:</label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={handleInputChange}
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

            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Login;
import React, { useCallback } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Link, withRouter } from 'react-router-dom';

import { auth } from '../../firebase';

import useForm from '../../hooks/useForm';

import './Login.scss';

const Login = ({ history }) => {

    const [{ email, password }, handleInputChange, handleInputReset] = useForm({
        email: '',
        password: ''
    });

    const handleSubmit = e => {
        e.preventDefault();

        // Validar campos
        if (!email.trim()) return toast.error('📧 El Email es obligatorio');
        if (!password.trim()) return toast.error('🔑 La Contraseña es obligatoria');

        // Enviar Formulario
        ingresar(email.trim(), password.trim());
    };

    const ingresar = useCallback(async (email, password) => {

        try {

            await auth.signInWithEmailAndPassword(email, password);

            handleInputReset();

            history.push('/tareas');
        } catch (error) {

            if (error.code === 'auth/user-not-found') return toast.error('🧾 Usuario o 🔑 Contraseña Incorrecta');
            if (error.code === 'auth/wrong-password') return toast.error('🧾 Usuario o 🔑 Contraseña Incorrecta');

        }

    }, [history, handleInputReset]);

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

export default withRouter(Login);
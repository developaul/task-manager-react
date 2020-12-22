import React, { useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, withRouter } from 'react-router-dom';

import { auth } from '../../firebase';

import useForm from '../../hooks/useForm';

import './Recover.scss';

const Recover = ({ history, setFirebaseRecover }) => {

    const [{ email }, handleInputChange, handleInputReset] = useForm({
        email: ''
    });

    const handleSubmit = e => {
        e.preventDefault();

        if (!email.trim()) return toast.error('📧 El Email es obligatorio');

        recover();
    };

    const recover = useCallback(async () => {

        try {

            await auth.sendPasswordResetEmail(email.trim());
            handleInputReset();

            setFirebaseRecover(true);

            history.push('/ingresar');

        } catch (error) {

            toast.error('📧 Email no válido');

        }

    }, [email, history, handleInputReset, setFirebaseRecover]);

    return (
        <div className="login form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Recuperar Contraseña</h1>

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
                        <input
                            className="btn_ btn-primario btn-block"
                            type="submit"
                            value="Recuperar Contraseña"
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

export default withRouter(Recover);
import React, { useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';

import { auth, db } from '../../firebase';

import useForm from '../../hooks/useForm';

import './Registry.scss';

const Registry = ({ history }) => {

    const [{ nombre, email, password, confirmar }, handleInputChange, handleInputReset] = useForm({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    const handleSubmit = e => {
        e.preventDefault();

        // Validar campos
        if (!nombre.trim()) return toast.error('📛 El Nombre es obligatorio');

        if (!email.trim()) return toast.error('📧 El Email es obligatorio');

        if (!password.trim()) return toast.error('🔑 La Contraseña es obligatoria');
        if (password.trim().length <= 6) return toast.error('🔑 La Contraseña debe ser mayor a 6 caracteres');

        if (!confirmar.trim()) return toast.error('🔑 La Confirmación de la contraseña es obligatoria');
        if (password.trim() !== confirmar.trim()) return toast.error('🔑 La Contraseña y la confirmación de la contraseña no coinciden');

        // Registrar Usuario
        registrar(nombre.trim(), email.trim(), password.trim());
    };

    const registrar = useCallback(async (nombre, email, password) => {

        try {

            const res = await auth.createUserWithEmailAndPassword(email, password);
            await db.collection('users').doc(res.user.uid).set({
                nombre,
                email,
                fecha: moment().format('DD/MM/YYYY')
            });

            handleInputReset();

            history.push('/tareas');
        } catch (error) {

            if (error.code === 'auth/email-already-in-use') return toast.warning('📧 El Email ya esta en uso, coloque otro por favor');
            if (error.code === 'auth/invalid-email') return toast.warning('📧 Email no válido');

        }

    }, [history, handleInputReset]);

    return (
        <div className="registry form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una Cuenta</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre:</label>

                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu Nombre"
                            value={nombre}
                            onChange={handleInputChange}
                        />
                    </div>

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
                        <label htmlFor="confirmar">Confirmar Password:</label>

                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu Password"
                            value={confirmar}
                            onChange={handleInputChange}
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
        </div >
    );
};

export default withRouter(Registry);
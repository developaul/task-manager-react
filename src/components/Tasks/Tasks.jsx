import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Sortable } from '@shopify/draggable';

import { auth, db } from '../../firebase';

import useForm from '../../hooks/useForm';

import { calculateDeadLineTask, calculateDeadLineTaskInverse } from '../../helpers';

import Task from '../Task';

import './Tasks.scss';

const Tasks = ({ history }) => {

    const [user, setUser] = useState(null);
    const [showAside, setShowAside] = useState(false);
    const [edicion, setEdicion] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        (auth.currentUser) ? setUser(auth.currentUser) : history.push('/');

        if (user) {
            try {

                (async () => {
                    const data = await db.collection(user.uid).get()
                    const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setTasks(arrayData);
                })();

            } catch (error) {

                toast.error('❓ Hubo un error');

            }

            const sortable = new Sortable(document.querySelectorAll('.task-container'), {
                draggable: 'article',
                delay: 200
            });

            sortable.on('sortable:stop', async e => {
                if (user) {
                    const id = e.data.dragEvent.data.originalSource.id;

                    if (e.newContainer.classList.contains('to-do')) {
                        await db.collection(user.uid).doc(id).update({
                            state: 'to-do'
                        });
                    } else if (e.newContainer.classList.contains('in-progress')) {
                        await db.collection(user.uid).doc(id).update({
                            state: 'in-progress'
                        });
                    } else if (e.newContainer.classList.contains('done')) {
                        await db.collection(user.uid).doc(id).update({
                            state: 'done'
                        });
                    }
                }
            });
        }

        // eslint-disable-next-line
    }, [user]);

    const deleteTask = async id => {

        try {

            await db.collection(user.uid).doc(id).delete();
            const newTasks = tasks.map(task => task.id === id ? { ...task, show: false } : task)
            setTasks(newTasks);

            toast.success('❌ Tarea borrada correctamente');

        } catch (error) {

            toast.error('❓ Hubo un error');

        }
    };

    const editTask = task => {
        setShowAside(true);

        const inicio = moment(task.created);
        const final = moment(task.deadline);

        const fecha = final.diff(inicio, 'days');
        task.date = calculateDeadLineTaskInverse(fecha);

        setEdicion(task);
    };

    return (
        <>
            <button
                className="button d-flex mx-auto mt-5"
                onClick={() => setShowAside(true)}
            >
                Nueva Tarea
            </button>

            <main className="container my-5">
                <div className="main-container">
                    <div className="container">
                        <h2>To do</h2>

                        <div className="task task-container to-do">
                            {
                                tasks.map(task => task.state === 'to-do' && (
                                    <Task
                                        key={task.id}
                                        editTask={editTask}
                                        deleteTask={deleteTask}
                                        task={task}
                                    />
                                ))
                            }
                        </div>
                    </div>

                    <div className="container">
                        <h2>In Progress</h2>

                        <div className="task task-container in-progress">
                            {
                                tasks.map(task => task.state === 'in-progress' && (
                                    <Task
                                        key={task.id}
                                        editTask={editTask}
                                        deleteTask={deleteTask}
                                        task={task}
                                    />
                                ))
                            }
                        </div>
                    </div>

                    <div className="container">
                        <h2>Done</h2>

                        <div className="task task-container done">
                            {
                                tasks.map(task => task.state === 'done' && (
                                    <Task
                                        key={task.id}
                                        task={task}
                                        editTask={editTask}
                                        deleteTask={deleteTask}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </main>

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

            <NewTask
                user={user}
                edicion={edicion}
                showAside={showAside}
                setShowAside={setShowAside}
                setTasks={setTasks}
                setEdicion={setEdicion}
            />
        </>
    );
};

const NewTask = ({ user, edicion, setEdicion, showAside, setShowAside, setTasks }) => {

    const [{ titleTask, responsibility, deadlineTask }, handleInputChange, handleInputReset, handleInputEdit] = useForm({
        titleTask: '',
        responsibility: '',
        deadlineTask: '',
    });

    useEffect(() => {
        if (edicion) {
            handleInputEdit({
                titleTask: edicion.title,
                responsibility: edicion.responsibility,
                deadlineTask: edicion.date
            });
        }

        // eslint-disable-next-line
    }, [edicion]);

    const createTask = async e => {
        e.preventDefault();

        // Validar
        if (!titleTask.trim()) return toast.error('📑 El título es obligatorio');
        if (!responsibility.trim()) return toast.error('📑 El nivel de responsabilidad es obligatorio');
        if (!deadlineTask.trim()) return toast.error('📑 El plazo de entrega es obligatorio');

        if (edicion) {
            // Modo Edición

            try {
                await db.collection(user.uid).doc(edicion.id).update({
                    title: titleTask.trim(),
                    responsibility: responsibility.trim(),
                    deadline: calculateDeadLineTask(edicion.created, deadlineTask.trim())
                });


                setTasks(tasks => (
                    tasks.map(task => task.id === edicion.id ? {
                        ...task,
                        title: titleTask.trim(),
                        responsibility: responsibility.trim(),
                        deadline: calculateDeadLineTask(task.created, deadlineTask.trim())
                    } : task)
                ));

                toast.success('🖊️ Tarea actualizada correctamente');
            } catch (error) {

                toast.error('❓ Hubo un error');

            }

            setEdicion(null);
        } else {
            // Crear nueva tarea

            try {
                const now = moment().format('YYYY/MM/DD');

                const newTask = {
                    title: titleTask.trim(),
                    responsibility: responsibility.trim(),
                    state: 'to-do',
                    show: true,
                    deadline: calculateDeadLineTask(now, deadlineTask.trim()),
                    created: now
                }

                const data = await db.collection(user.uid).add(newTask);

                setTasks(tasks => ([
                    ...tasks,
                    { ...newTask, id: data.id }
                ]));

                toast.success('✔️ Tarea agregada correctamente');

            } catch (error) {

                toast.error('❓ Hubo un error');

            }
        }

        handleInputReset();
        setShowAside(false);
    };

    return (
        <aside className={`${showAside ? 'active' : ''}`}>
            <div className="aside-container">
                <h2>{edicion ? 'Editar Tarea' : 'Nueva Tarea'}</h2>

                <div className="form-container">
                    <form>

                        <div className="input-container">
                            <label htmlFor="titleTask">Título</label>

                            <input
                                type="text"
                                id="titleTask"
                                name="titleTask"
                                placeholder="Escriba un título descriptivo"
                                value={titleTask}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="input-container">
                            <label htmlFor="responsibility">Nivel de Responsabilidad</label>

                            <select
                                id="responsibility"
                                name="responsibility"
                                value={responsibility}
                                onChange={handleInputChange}
                            >
                                <option value="">-Seleccionar-</option>
                                <option value="Bajo">Bajo</option>
                                <option value="Medio">Medio</option>
                                <option value="Alto">Alto</option>
                            </select>
                        </div>

                        <div className="input-container">
                            <label htmlFor="deadlineTask">Plazo de entrega</label>

                            <select
                                id="deadlineTask"
                                name="deadlineTask"
                                value={deadlineTask}
                                onChange={handleInputChange}
                            >
                                <option value="">-Seleccionar-</option>
                                <option value="one">1 día</option>
                                <option value="two">2 días</option>
                                <option value="three">3 días</option>
                                <option value="five">5 días</option>
                                <option value="seven">1 semana</option>
                            </select>
                        </div>

                        <div className="action-container">
                            <button
                                type="submit"
                                onClick={createTask}
                            >
                                Guardar
                            </button>

                            <button
                                type="reset"
                                onClick={() => {
                                    handleInputReset();
                                    setShowAside(false);
                                    setEdicion(null);
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </aside>
    );
};

export default withRouter(Tasks);
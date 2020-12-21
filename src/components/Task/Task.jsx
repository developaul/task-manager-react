import React from 'react'

import moment from 'moment';

import Delete from '../../assets/images/delete.svg';
import Edit from '../../assets/images/edit.svg';

import './Task.scss';

const Task = ({ task, editTask, deleteTask }) => {

    const { id, responsibility, title, deadline, show } = task;

    const fecha = moment(deadline).format('DD/MM/YYYY');

    return (
        <article className={`task ${show ? '' : 'd-none'}`} id={id}>
            <div className="task_custom">
                <div className="task_custom_info">
                    <h3>{title}</h3>

                    <p>Nivel de Responsabilidad: <span>{responsibility}</span></p>
                    <p>Plazo: <span>{fecha}</span></p>
                </div>

                <div className="task_custom_buttons">
                    <button
                        className="btn btn-outline-warning"
                        onClick={() => editTask(task)}
                    >
                        <img src={Edit} alt="Editar" />
                    </button>

                    <button
                        className="btn btn-outline-danger ml-2"
                        onClick={() => deleteTask(id)}
                    >
                        <img src={Delete} alt="Eliminar" />
                    </button>
                </div>
            </div>
        </article>
    );
};

export default Task;
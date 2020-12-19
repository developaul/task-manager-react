import React from 'react';

const Tasks = () => {
    return (
        <>
            <main>
                <div className="main-container">
                    <h1 className="text-center">Task Manager</h1>

                    <div className="container">
                        <h2>To do</h2>

                        <div className="task-container">
                            <article className="task">
                                <h3>Nombre de la tarea</h3>

                                <p>Responsable: <span>Paul Chávez</span></p>
                                <p>Plazo: <span>30-12-2020</span></p>
                            </article>
                        </div> {/* End Tarea (row)*/}
                    </div> {/* End Container (col)*/}
                </div>
            </main>

            <aside>
                <div className="aside-container">
                    <h2>Nueva Tarea</h2>

                    <div className="form-container">
                        <form>

                            <div className="input-container">
                                <label htmlFor="titleTask">Título</label>

                                <input
                                    type="text"
                                    id="titleTask"
                                    name="titleTask"
                                    placeholder="Escriba un título descriptivo"
                                />
                            </div>

                            <div className="input-container">
                                <label htmlFor="personTask">Nivel de Responsabilidad</label>

                                <select
                                    id="personTask"
                                    name="personTask"
                                >
                                    <option value="">-Seleccionar-</option>
                                    <option value="low">Bajo</option>
                                    <option value="mid">Medio</option>
                                    <option value="hight">Alto</option>
                                </select>
                            </div>

                            <div className="input-container">
                                <label htmlFor="deadlineTask">Plazo de entrega</label>

                                <select
                                    id="deadlineTask"
                                    name="deadlineTask"
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
                                >
                                    Guardar
                                </button>

                                <button
                                    type="reset"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Tasks;
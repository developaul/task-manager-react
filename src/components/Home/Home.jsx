import React from 'react';
import { AiOutlineTwitter, AiOutlineGithub } from 'react-icons/ai';
import { Carousel } from 'react-bootstrap';

import captura1 from '../../assets/images/pantalla1.png';
import captura2 from '../../assets/images/pantalla2.png';
import captura3 from '../../assets/images/pantalla3.png';

import add from '../../assets/images/add.svg';
import time from '../../assets/images/time.svg';
import levels from '../../assets/images/levels.svg';

import './Home.scss';

const Home = () => {
    return (
        <main className="home">

            <h2 className="home_title">Task Manager</h2>

            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block mx-auto img-fluid"
                        src={captura1}
                        alt="First slide"
                    />

                    <Carousel.Caption>
                        <h3>Ordenar Tareas</h3>
                        <p>Para ordenar una tarea es suficiente con arrastrarla.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block mx-auto img-fluid"
                        src={captura2}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Agregar Tareas</h3>
                        <p>Te permite agregar nuevas tareas de manera sencilla.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block mx-auto img-fluid"
                        src={captura3}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Manipular Tareas</h3>
                        <p>Las tareas siempre estan visibles para editarlas o eliminarlas.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <section className="container home_services">
                <article className="article facilidad">
                    <img src={add} alt="add" className="img" />
                    <h2>Facilidad</h2>
                    <p>Crea tareas de manera rápida en un simple paso.</p>
                </article>

                <article className="article plazo">
                    <img src={time} alt="time" className="img" />
                    <h2>Plazos</h2>
                    <p>Establece plazos a tus tareas de manera sencilla.</p>
                </article>

                <article className="article apuntes">
                    <img src={levels} alt="levels" className="img" />
                    <h2>Responsabilidad</h2>
                    <p>Establece niveles de responsabilidad a tus tareas.</p>
                </article>
            </section>

            <div className="home_about">
                <section className="container">
                    <h2>Acerca de la aplicación</h2>

                    <div className="home_about_info">
                        <p>
                            Task Manager es una aplicación para organizar tareas en las siguientes categorias <span>To do</span>, <span>In Progress</span>, <span>Done</span> para mantener cierta organización a la hora de realizar tareas. Desarrollada con ReactJS, SASS, Bootstrap, DraggableJS, MomentJS, Firebase.
                        </p>
                    </div>
                </section>
            </div>

            <section className="container home_contact">
                <h2>Contacto con el desarrolador</h2>

                <div className="home_contact_sociales">
                    <a href="https://twitter.com/developaul" target="_blank" rel="noopener noreferrer" className="social twitter">
                        <AiOutlineTwitter size={'10rem'} />
                        <span>@developaul</span>
                    </a>

                    <a href="https://github.com/developaul" target="_blank" rel="noopener noreferrer" className="social github">
                        <AiOutlineGithub size={'10rem'} />
                        <span>@developaul</span>
                    </a>
                </div>
            </section>
        </main>
    );
};

export default Home;
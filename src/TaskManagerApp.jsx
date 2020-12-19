import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Registry from './components/Registry';
import Footer from './components/Footer';

// Por mientras
import Tasks from './components/Tasks';

const TaskManagerApp = () => {
    return (
        <Router>
            <Navbar />

            <Switch>
                <Route exact path="/">
                    Inicio
                </Route>

                <Route exact path="/ingresar">
                    <Login />
                </Route>

                <Route exact path="/registrar">
                    <Registry />
                </Route>

                <Route exact path="/tareas">
                    <Tasks />
                </Route>
            </Switch>

            <Footer />
        </Router>
    );
};

export default TaskManagerApp;
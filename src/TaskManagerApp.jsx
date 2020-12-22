import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { auth } from './firebase';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Registry from './components/Registry';
import Footer from './components/Footer';
import Tasks from './components/Tasks';

const TaskManagerApp = () => {

    const [firebaseUser, setFirebaseUser] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(user => user ? setFirebaseUser(user) : setFirebaseUser(null));
    }, []);

    return firebaseUser !== false ? (
        <Router>
            <Navbar firebaseUser={firebaseUser} />

            <Switch>
                <Route exact path="/">
                    <Home />
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
    ) : <Spinner className="spinner" animation="grow" />
};

export default TaskManagerApp;
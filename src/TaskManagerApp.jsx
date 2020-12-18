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
                    <Tasks />
                </Route>

                <Route exact path="/ingresar">
                    <Login />
                </Route>

                <Route exact path="/registrar">
                    <Registry />
                </Route>
            </Switch>

            <Footer />
        </Router>
    );
};

export default TaskManagerApp;
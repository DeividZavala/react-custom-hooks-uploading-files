import React from 'react';
import {Switch, Route} from "react-router";
import Home from './home';
import NewBeer from './components/NewBeer';

const Router = () => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/new" component={NewBeer}/>
    </Switch>
);

export default Router;

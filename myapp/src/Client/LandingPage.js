import React from 'react';
import { Route, Switch} from "react-router-dom";
import CreateAccount from './CreateAccount';
import LoginComp from './LoginComp';
import HomePage from './HomePage';

const LandingPage = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={LoginComp}/>
                <Route path="/createAccount" component={CreateAccount}/>
                <Route path="/home" component={HomePage}/>
            </Switch>
        </div>
    );
};

export default LandingPage;
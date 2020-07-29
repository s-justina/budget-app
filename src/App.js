import React from 'react';
import {ThemeProvider} from "styled-components";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import GlobalStyles from './index.css';
import {Navigation} from "components";
import theme from 'utils/theme'

function App() {
    return (

        <ThemeProvider theme={theme}>
            <GlobalStyles/>
            <Router>
                <Navigation items={[
                    {content: 'Homepage', to: '/'},
                    {content: 'Budget', to: '/budget'}
                ]}/>
                <Switch>
                    <Route exact path='/'>
                        Homepage
                    </Route>
                    <Route part='/budget'>
                        Budget page
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;

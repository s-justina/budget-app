import React from 'react';
import {ThemeProvider} from "styled-components";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {useTranslation} from "react-i18next";

import GlobalStyles from './index.css';
import {Navigation} from "components";
import theme from 'utils/theme'
import {Wrapper} from "components";


function App() {
    const { i18n } = useTranslation();
    return (

        <ThemeProvider theme={theme}>
            <GlobalStyles/>
            <Router>
                <Navigation items={[
                    {content: 'Homepage', to: '/'},
                    {content: 'Budget', to: '/budget'}
                ]}
                RightElement={(
                    <div>
                        <button onClick={()=>i18n.changeLanguage('pl')}>pl</button>
                        <button onClick={()=>i18n.changeLanguage('en')}>en</button>
                    </div>
                )}
                />
                <Wrapper>
                    <Switch>
                        <Route exact path='/'>
                            Homepage
                        </Route>
                        <Route part='/budget'>
                            Budget page
                        </Route>
                    </Switch>
                </Wrapper>
            </Router>
        </ThemeProvider>
    );
}

function RootApp() {
return(
    <React.Suspense fallback={'loading...'}>
        <App/>
    </React.Suspense>
)
}

export default RootApp;

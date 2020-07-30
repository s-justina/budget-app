import React, {Fragment} from 'react';
import {ThemeProvider} from "styled-components";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {useTranslation} from "react-i18next";

import GlobalStyles from './index.css';
import {Navigation, Wrapper, LoadingIndicator, Button} from "components";
import theme from 'utils/theme'


function App() {
    const { i18n } = useTranslation();
    return (

        <Fragment>
            <GlobalStyles/>
            <Router>
                <Navigation items={[
                    {content: 'Homepage', to: '/'},
                    {content: 'Budget', to: '/budget'}
                ]}
                RightElement={(
                    <div>
                        <Button variant='regular' onClick={()=>i18n.changeLanguage('pl')}>pl</Button>
                        <Button variant='regular' onClick={()=>i18n.changeLanguage('en')}>en</Button>
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
        </Fragment>
    );
}

function RootApp() {
return(
    <ThemeProvider theme={theme}>
    <React.Suspense fallback={<LoadingIndicator/>}>
        <App/>
    </React.Suspense>
    </ThemeProvider>
)
}

export default RootApp;

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Senja from './Senja/Senja';
import ViewSenja from './Senja/ViewSenja/ViewSenja';
import Client from './Client/Client';
import ViewClient from './Client/ViewClient/ViewClient';

class App extends React.Component {
    render() {
        let viewer = this.props.viewer;
        return(
            <Router>
                <Switch>
                    <Route
                        exact
                        path={'/'}
                        title={'Senja'}
                        render={props => <Senja {...props} viewer={viewer}/>}
                    />
                    <Route
                        exact
                        path={'/senja/:id'}
                        title={'Senja View'}
                        render={props => <ViewSenja {...props} viewer={viewer}/>}
                    />
                    <Route
                        exact
                        path={'/clients'}
                        title={'Client'}
                        render={props => <Client {...props} viewer={viewer}/>}
                    />
                    <Route
                        exact
                        path={'/client/:id'}
                        title={'Client View'}
                        render={props => <ViewClient {...props} viewer={viewer}/>}
                    />
                </Switch>
            </Router>
        )
    }
}

export default createFragmentContainer(App, {
    viewer: graphql`
        fragment App_viewer on Viewer {
            id
            plainId
        }
    `
})

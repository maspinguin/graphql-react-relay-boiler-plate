import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Senja from './Senja/Senja';

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

import React from 'react';
import { QueryRenderer } from 'react-relay';
import RelayService from '../services/RelayService';

class AppLoader extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <QueryRenderer
                environment={RelayService.environment}
                query={graphql`
                    query AppLoaderQuery {
                        viewer {
                            id
                            plainId
                        }
                    }
                `}
                render={({ error, props }) => {
                    if(error) {
                        console.log('error', error)
                        return <div>error</div>
                    }
                    else if(props) {
                        return <div> success page!</div>
                    }
                   return 'loading...';
                }}
            ></QueryRenderer>
        )
    }
}

export default  AppLoader;

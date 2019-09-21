import React from 'react';
import {QueryRenderer} from "react-relay";
import RelayService from "../../../services/RelayService";
import ViewSenjaDetail from "./ViewSenjaDetail";

const query = graphql`
    query ViewSenjaDetailLoaderQuery($id: String!) {
        viewer {
            ...ViewSenjaDetail_viewer @arguments(id:$id)
        }
    }
`;
export default class ViewSenjaDetailLoader extends React.Component{
    render() {
        let id = this.props.id;
        return(
            <QueryRenderer
                environment={RelayService.environment}
                query={query}
                variables={{id}}
                render={({ error, props }) => {
                    if(error) {
                        console.log('error', error)
                        return <div>error</div>
                    }
                    else if(props) {
                        return <ViewSenjaDetail
                            viewer={props.viewer}
                        />
                    }
                    return 'loading...';
                }}
            ></QueryRenderer>
        )
    }
}

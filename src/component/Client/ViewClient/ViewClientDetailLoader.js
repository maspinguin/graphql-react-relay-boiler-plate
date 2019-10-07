import React from 'react';
import {QueryRenderer} from "react-relay";
import RelayService from "../../../services/RelayService";
import ViewClientDetail from "./ViewClientDetail";

const query = graphql`
    query ViewClientDetailLoaderQuery($id: String!) {
        viewer {
            ...ViewClientDetail_viewer @arguments(id:$id)
        }
    }
`;
export default class ViewClientDetailLoader extends React.Component{
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
                        return <ViewClientDetail
                            id={id}
                            viewer={props.viewer}
                        />
                    }
                    return 'loading...';
                }}
            ></QueryRenderer>
        )
    }
}

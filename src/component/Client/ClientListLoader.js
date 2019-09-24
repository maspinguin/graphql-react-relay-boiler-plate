import React from 'react';
import RelayService from "../../services/RelayService";
import ClientList from "./ClientList";
import {QueryRenderer} from "react-relay";

const query = graphql`
        query ClientListLoaderQuery {
            viewer {
                ...ClientList_viewer
            }
        }
    `;
class ClientListLoader extends React.Component{
    render() {
        return(
            <QueryRenderer
                environment={RelayService.environment}
                query={query}
                render={({ error, props }) => {
                    if(error) {
                        // console.log('error', error)
                        return <div>error</div>
                    }
                    else if(props) {
                        return <ClientList
                            searchText={this.props.searchText}
                            viewer={props.viewer}
                        />
                    }
                    return <div>loading...</div>;
                }}
            ></QueryRenderer>
        )
    }
}
export default ClientListLoader;

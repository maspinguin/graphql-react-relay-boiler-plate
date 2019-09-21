import React from 'react';
import RelayService from "../../services/RelayService";
import SenjaList from "./SenjaList";
import {QueryRenderer} from "react-relay";

const query = graphql`
        query SenjaListLoaderQuery {
            viewer {
                ...SenjaList_viewer
            }
        }
    `;
class SenjaListLoader extends React.Component{
    render() {
        return(
            <QueryRenderer
                environment={RelayService.environment}
                query={query}
                render={({ error, props }) => {
                    if(error) {
                        console.log('error', error)
                        return <div>error</div>
                    }
                    else if(props) {
                        return <SenjaList
                            searchText={this.props.searchText}
                            viewer={props.viewer}
                        />
                    }
                    return 'loading...';
                }}
            ></QueryRenderer>
        )
    }
}
export default SenjaListLoader;

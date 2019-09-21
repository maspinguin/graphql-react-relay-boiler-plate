import React from 'react';
import { withRouter } from 'react-router';
import { createPaginationContainer, graphql } from 'react-relay';
import _ from 'lodash';
import ConditionalRender from '../ConditionalRender';

class SenjaList extends React.Component{
    constructor() {
        super();
        this.state = {
            first: 10,
            tableLoading: false,
            rowTableLoading: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.searchText !== prevProps.searchText)||
            (this.state.first !== prevState.first)
        ) {
            this.setState({ tableLoading: true });
            // console.log(this.state.selectedFilter);

            if (!this.props.relay.isLoading()) {
                this.props.relay.refetchConnection(
                    parseInt(this.state.first),
                    () => {
                        this.setState({tableLoading : false});
                    },
                    {
                        first: parseInt(this.state.first),
                        search: this.props.searchText,
                        tableLoading: false,
                        filters: null
                    }
                );
            }
        }
    }


    loadMoreClick() {
        if (!this.props.relay.hasMore()) {
            console.log('Nothing more to load');
            return;
        } else if (this.props.relay.isLoading()) {
            console.log('Request is already pending');
            return;
        }

        this.setState({rowTableLoading: true});

        this.props.relay.loadMore(
            parseInt(this.state.first, 0) + 1,  // Fetch the next n feed items
            () => {
                this.setState({ rowTableLoading :false, tableLoading: false});
            }
        );
    }
    goToDetail(id) {
        this.props.history.push('/senja/'+id);
    }
    render() {
        let rows;
        let endCount = 0;
        if(this.props.viewer.senjas) {
            endCount = _.size(this.props.viewer.senjas.edges);
            if(endCount > 0 ) {
                rows = this.props.viewer.senjas.edges.map((edge, index) => {
                    let senjas = edge.node;
                    return (
                        <tr key={senjas.id} id={senjas.id}>
                            <td>{senjas.plainId}</td>
                            <td>{senjas.name}</td>
                            <td>
                                <button onClick={()=>this.goToDetail(senjas.plainId)}>view</button>
                            </td>
                        </tr>
                    );
                });
            }
            else {
                rows = <tr><td colSpan={3}> No data found.</td></tr>;
            }
        }
        return (
            <div>
                <ConditionalRender when={!this.state.tableLoading}>
                    <table>
                        <thead>
                            <tr>
                                <th>plain Id</th>
                                <th>name</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                            <tr>
                                <td colSpan={10} style={{textAlign: 'center'}}>
                                    <ConditionalRender when={this.state.rowTableLoading}>
                                        Loading table row...
                                    </ConditionalRender>
                                    <ConditionalRender when={!this.state.rowTableLoading && this.props.relay.hasMore()}>
                                        <a
                                            onClick={() => this.loadMoreClick()}
                                            style={{color: 'blue'}}>
                                            Load more
                                        </a>
                                    </ConditionalRender>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </ConditionalRender>
                <ConditionalRender when={this.state.tableLoading}>
                    Loading table..
                </ConditionalRender>
            </div>
        )
    }
}

export default createPaginationContainer(
    withRouter(SenjaList),
    {
        viewer: graphql`
            fragment SenjaList_viewer on Viewer
            @argumentDefinitions(
                count: { type: "Int" , defaultValue: 10}
                cursor: { type: "String" }
                search: { type: "String" }
                filters: { type: "[JSONObject]", defaultValue: []}
            ) {
                senjas(first: $count, after: $cursor, search: $search, filters: $filters)  @connection(key: "SenjaList_senjas", filters: []) {
                    pageInfo{
                        hasNextPage,
                        hasPreviousPage,
                        startCursor,
                        endCursor
                    }
                    edges{
                        node{
                            id,
                            plainId,
                            name
                        }
                    }
                }
            }
        `
    },
    {
        direction: 'forward',
        getConnectionFromProps(props) {
            return props.viewer && props.viewer.senjas;
        },
        // This is also the default implementation of `getFragmentVariables` if it isn't provided.
        getFragmentVariables(prevVars, totalCount) {
            return {
                ...prevVars,
                count: totalCount,
            };
        },
        getVariables(props, {count, cursor, filters}, fragmentVariables) {
            return {
                count,
                cursor,
                filters
                //orderBy: fragmentVariables.orderBy,
                // userID isn't specified as an @argument for the fragment, but it should be a variable available for the fragment under the query root.
                //userID: fragmentVariables.userID,
            };
        },
        query: graphql`
            query SenjaListPaginationQuery(
            $count: Int!
            $cursor: String
            $search: String
            $filters: [JSONObject]

            ) {
                viewer {
                    ...SenjaList_viewer @arguments(count: $count, cursor: $cursor, search: $search, filters: $filters)
                }
            }
        `
    }
);


import React from 'react';
import { withRouter } from 'react-router';
import { createRefetchContainer, graphql } from 'react-relay';
import ConditionalRender from '../../ConditionalRender';
import _ from 'lodash';
import ClientUpdateSubscription from '../../../subscription/ClientUpdateSubscription';

class ViewClientDetail extends React.Component{
    componentDidMount()
    {
        let input = {
            plainId: this.props.id
        };
        ClientUpdateSubscription(this.props.relay.environment,input);
    }

    render() {
        const detailData = this.props.viewer.client;
        return (
            <div>
                <ConditionalRender when={!_.isUndefined(detailData)}>
                    {(detailData) ?
                    <div>
                        <div>plainId: {detailData.plainId} </div>
                        <div>name: {detailData.name} </div>
                        <div>email: {detailData.email} </div>
                        <div>status: {detailData.status}</div>
                    </div>
                     :null }
                </ConditionalRender>
                <ConditionalRender when={_.isUndefined(detailData) || _.isNull(detailData)}>
                    no data found.
                </ConditionalRender>

            </div>
        )
    }
}

export default createRefetchContainer(withRouter(ViewClientDetail), {
        viewer: graphql`
            fragment ViewClientDetail_viewer on Viewer
            @argumentDefinitions(
                id: { type: "String" }
            ) {
                client(id:$id){
                    id,
                    plainId,
                    name,
                    email,
                    status
                }
            }
        `
    },
    graphql`
        query ViewClientDetailRefetchQuery($id: String!) {
            viewer {
                ...ViewClientDetail_viewer @arguments(id: $id)
            }
        }
    `
);

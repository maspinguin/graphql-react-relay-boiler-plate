import React from 'react';
import { withRouter } from 'react-router';
import { createRefetchContainer, graphql } from 'react-relay';
import ConditionalRender from '../../ConditionalRender';
import _ from 'lodash';


class ViewClientDetail extends React.Component {
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
                    email
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

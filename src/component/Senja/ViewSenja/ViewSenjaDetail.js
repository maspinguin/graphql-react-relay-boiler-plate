import React from 'react';
import { withRouter } from 'react-router';
import { createRefetchContainer, graphql } from 'react-relay';
import ConditionalRender from '../../ConditionalRender';
import _ from 'lodash';


class ViewSenjaDetail extends React.Component {
    render() {
        const detailData = this.props.viewer.senja;
        return (
            <div>
                <ConditionalRender when={!_.isUndefined(detailData)}>
                    {(detailData) ?
                    <div>
                        <div>plainId: {detailData.plainId} </div>
                        <div>nama: {detailData.name} </div>
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

export default createRefetchContainer(withRouter(ViewSenjaDetail), {
        viewer: graphql`
            fragment ViewSenjaDetail_viewer on Viewer
            @argumentDefinitions(
                id: { type: "String" }
            ) {
                senja(id:$id){
                    id,
                    plainId,
                    name
                }
            }
        `
    },
    graphql`
        query ViewSenjaDetailRefetchQuery($id: String!) {
            viewer {
                ...ViewSenjaDetail_viewer @arguments(id: $id)
            }
        }
    `
);

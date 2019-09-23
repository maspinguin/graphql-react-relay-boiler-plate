import React from 'react';
import ViewClientDetailLoader from './ViewClientDetailLoader';
export default class ViewClient extends React.Component {
    render() {
        const id = this.props.match.params.id;
        return (
            <div>
                Detail Page
                <ViewClientDetailLoader id={id}></ViewClientDetailLoader>
            </div>
        )
    }
}

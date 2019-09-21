import React from 'react';
import ViewSenjaDetailLoader from './ViewSenjaDetailLoader';
export default class ViewSenja extends React.Component {
    render() {
        const id = this.props.match.params.id;
        return (
            <div>
                Detail Page
                <ViewSenjaDetailLoader id={id}></ViewSenjaDetailLoader>
            </div>
        )
    }
}

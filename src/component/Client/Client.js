import React from 'react';
import ClientListLoader from './ClientListLoader';

class Client extends React.Component{
    constructor() {
        super();
        this.state = {
            searchText: '',

        }
    }
    onChangeSearch(e) {
        this.setState({
            searchText: e.target.value
        })
    }
    render() {
        return (
            <div>
                Search:
                <input
                    type={'text'}
                    onChange={(e) => this.onChangeSearch(e)}
                />
                <ClientListLoader
                    viewer={this.props.viewer}
                    searchText={this.state.searchText}
                />
            </div>
        )
    }
}

export default Client;

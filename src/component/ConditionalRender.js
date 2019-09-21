import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ConditionalRender extends Component {
    static propTypes = {
        when: PropTypes.bool.isRequired
    };

    render() {
        return this.props.when? this.props.children : null;
    }

}

export default ConditionalRender;

import React from 'react';
import '../styles.css';

export default class App extends React.Component {
    componentDidMount () {
        console.log('It works!');
    }

    render() {
        return (<div className="test-class">{ this.props.param }</div>)
    }
}

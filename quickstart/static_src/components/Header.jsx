import React from 'react';
import PropTypes from 'prop-types';
import MessageField from './MessageField.jsx';
import '../styles.css';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";

class Header extends React.Component {

    static propTypes = {
    messageCount: PropTypes.number,
};



    static defaultProps = {
        messageCount : 1,
    };


    render() {
        const {chatId} = this.props;

        return (
            <div className="header">
                Всего сообщений: {this.props.messageCount}
            </div>
        )
    }
}

const mapStateToProps = ({messageReducer}) => ({
    messageCount: messageReducer.messageCount,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
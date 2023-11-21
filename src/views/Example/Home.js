import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux'

import logo from '../../assets/images/imageAmongus.png'

import Color from "../HOC/Color";

class Home extends React.Component {

    handleDeleteUser = (user) => {
        console.log(">>> check: ", user)
        this.props.deleteUserRedux(user);
    }

    handleCreateUser = () => {
        console.log("Adding new user...");
        this.props.addUserRedux()
    }

    render() {
        console.log(">>>Check: ", this.props.dataRedux)
        let listUsers = this.props.dataRedux
        return (
            <>
                <div>Hello home</div>
                <div>
                    <img src={logo} />
                </div>
                <div>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <div key={item.id}>
                                    {index + 1} {item.name}
                                    &nbsp;<span onClick={() => this.handleDeleteUser(item)}>x</span>
                                </div>
                            )
                        })
                    }
                    <button onClick={() => this.handleCreateUser()}>Add new</button>
                </div>
            </>
        )
    }
}
// export default withRouter(Home);
const mapStateToProp = (state) => {
    return {
        dataRedux: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUserRedux: (userDelete) => dispatch({ type: 'DELETE_USER', payload: userDelete }),
        addUserRedux: () => dispatch({ type: 'CREATE_USER' }),
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(Color(Home));
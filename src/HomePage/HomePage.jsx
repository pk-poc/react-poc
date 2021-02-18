import React from 'react';
import axios from 'axios';

import { Link, Redirect } from 'react-router-dom';
import * as ReactTable from 'react-bootstrap';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { persons: [] };
    }

    componentDidMount() {
        this.props.getUsers();
        this.fetchData();
    }

    fetchData() {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                const persons = res.data;
                console.log(persons);
                this.setState({ persons });
            })
    }

    

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {

        const renderPerson = (person, index) => {

            return(
                <tr key={index}>
                    <td>{person.id}</td>
                    <td>{person.name}</td>
                    <td>{person.email}</td>
                </tr>
            )
        
        }


        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <p>Welcome {user.firstName}!</p>


                <span >
                    <p style={{ marginLeft: '831px' }}>
                        <Link to="/login">Logout</Link>
                    </p>
                </span>

                <div style={{ marginRight: "100px" }}>

                    <ReactTable.Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.persons.map(renderPerson)}  
                        </tbody>
                    </ReactTable.Table>


                    {/* <table>
                    <thead>
                    <th>Id</th>
                    
                    </thead>
                
                <tbody>
                    <tr>{this.state.persons.map(person => <td>{person.id}</td>)}</tr>
                </tbody>
                </table> */}
                </div>

            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
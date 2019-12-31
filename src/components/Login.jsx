import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username: "",
            password: "",
            redirectTo: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')
        console.log(`Username: ${this.state.username}`)
        console.log(`Password: ${this.state.password}`)

        axios.post('/api/user/login',{
            username: this.state.username,
            password: this.state.password
        })
        .then(response=>{
            console.log('Login response: ');
            console.log(response);
            if(response.status === 200){
                console.log('Successful Login')
                this.props.updateUser({
                    loggedIn: true,
                    username: response.data.username
                })
                this.setState({
                    redirectTo: '/'
                })
            }
            else{
                console.log('Login error')
            }
        })
        .catch(err=>{
            console.log("Error during login post to server")
            console.log(err)
        })
    }

    render(){
        return (
            <div>
                <h1>Login</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mb-3"
                        onClick={this.handleSubmit}>Submit</button>
                </form>
                {(this.state.redirectTo !== "") ? <Redirect to={this.state.redirectTo}/> : null}
            </div>
        )    
    }
}

export default Login;
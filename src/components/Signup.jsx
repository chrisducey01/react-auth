import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
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

        axios.post('/api/user/signup',{
            username: this.state.username,
            password: this.state.password
        })
        .then(response=>{
            console.log(response)
            if(response.data){
                console.log('Successful Signup')
                this.setState({
                    redirectTo: '/login'
                })
            }
            else{
                console.log('Signup error')
            }
        })
        .catch(err=>{
            console.log("Error during signup post to server")
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <h1>Signup</h1>
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

export default Signup;
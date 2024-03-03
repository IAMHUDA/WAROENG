import React, { Component } from "react";
import { Link } from "react-router-dom";
import Validation from "../components/LoginValidation";
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            loginSuccess: false
        };
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const errors = Validation(this.state);
        this.setState({ errors });

        if (errors.email === '' && errors.password === '') {
            const userData = {
                email: this.state.email,
                password: this.state.password
            };
            axios.post('http://localhost:8081/login', userData)
                .then(res => {
                    console.log(res);
                    this.setState({ loginSuccess: true });
                    this.props.history.push('/home');
                })
                .catch(err => console.log(err));
        }
    };

    render() {
        const { email, password, errors, loginSuccess } = this.state;

        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-primary">
                <div className="bg-white p-4 rounded w-50">
                    <h2 className="text-center mb-4">Login</h2>
                    {loginSuccess && (
                        <div className="alert alert-success" role="alert">
                            Login successful!
                        </div>
                    )}
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" className="form-control" id="email" placeholder="Enter Email" name="email" value={email} onChange={this.handleInput} />
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter Password" name="password" value={password} onChange={this.handleInput} />
                            {errors.password && <span className="text-danger">{errors.password}</span>}
                        </div>
                        <button type="submit" className="btn btn-success w-100 mb-3">Login</button>
                        <p className="text-center">By logging in, you agree to our terms and policies</p>
                        <Link to="/Signup" className="btn btn-outline-secondary w-100">Register</Link>
                    </form>
                </div> 
            </div>
        );
    }
}

export default Login;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Validation from "../components/SignupValidation";
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {
                email: '',
                password: ''
            }
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
            axios.post('http://localhost:8081/signup', this.state)
                .then(res => {
                    console.log(res);
                    this.props.history.push('/'); // Navigate to home after successful signup
                })
                .catch(err => console.log(err));
        }
    };

    render() {
        const { email, password, errors } = this.state;

        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-primary">
                <div className="bg-white p-4 rounded w-50">
                    <h2 className="text-center mb-4">Register</h2>
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
                        <button type="submit" className="btn btn-success w-100 mb-3">Register</button>
                        <p className="text-center">By registering, you agree to our terms and policies</p>
                        <Link to="/" className="btn btn-outline-secondary w-100">Login</Link>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;

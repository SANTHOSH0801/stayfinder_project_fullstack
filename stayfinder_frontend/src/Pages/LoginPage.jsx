import NavBar from '../Components/NavBar'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import image1 from '../assets/LoginPage.jpg'
import '../css/LoginPage.css'

function LoginPage() {
    const [inputs, setInputs] = useState({})

    const navigate = useNavigate()

const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://stayfinderbackend-production.up.railway.app/api/login', inputs);
            console.log(response.data);
            if (response.data.success) {
                // console.log("Login successful");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", response.data.userId);
                localStorage.setItem("userId", response.data.userId); // store userId for owner filtering
                localStorage.setItem("userRole", response.data.role); // store user role
                // console.log("Data:", response);
                navigate('/');
            } else {
                console.log("Login failed:", response.data.error);
                // alert(response.data.error);
            }
        } catch (error) {
            console.log("Login error:", error);
            // alert("Invalid creddentials.");
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));
    };
    return (
        <>
            <NavBar />
            <section className="login-section">
                <div className="login-container">
                    {/* Left Side */}
                    <div className="form-side">
                        <div className="form-header">
                            <i className="fas fa-crow icon"></i>
                            <span className="title">SIGN IN</span>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form">

                            <div className="input-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={inputs.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={inputs.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <button type="submit" className="login-btn">Login</button>

                            <div className="extra-links">
                                <p><a href="#">Forgot password?</a></p>
                                <p>Don't have an account? <a onClick={() => navigate('/Signup')} >Register here</a></p>
                            </div>
                        </form>
                    </div>

                    {/* Right Side */}
                    <div className="image-side">
                        <img src= {image1} alt="Login Visual" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginPage

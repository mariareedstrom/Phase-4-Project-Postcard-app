import React, { useState } from 'react';
import {Link} from "react-router-dom";


function LoginForm({ setCurrentUser }) {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })


    function handleChange(e){
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formData)
        })
            .then((res) => {
                if (res.ok) {
                    res.json().then((user) => {
                        setCurrentUser(user)
                    })
                } else
                    res.json().then((errors) => {
                        console.error(errors)
                    })
            })

    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>LogIn</h2>
                <p>
                <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value = {formData.username}
                        onChange = {(e) => handleChange(e)}
                    />
                </p>
                <p>
                <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value = {formData.password}
                        onChange = {(e) => handleChange(e)}
                    />
                </p>
                <p>
                    <button type="submit">Submit</button>
                </p>
                <p>
                    <Link to="/api/signup">Create Account Here</Link>
                </p>
            </form>
        </div>
    );
}

export default LoginForm;
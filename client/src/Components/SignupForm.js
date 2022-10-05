import React, { useState } from 'react';
import {Link} from "react-router-dom";




function SignupForm({setCurrentUser}) {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: ""
    })


    function handleChange(e){
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()

        fetch('/api/signup', {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formData)
        })
            .then((resp) => {
                if (resp.ok) {
                    resp.json().then((user) => {
                        console.log(user)
                        setCurrentUser(user)
                    })
                } else {
                        resp.json().then((errors) => {
                            console.log(errors)
                        })
                    }
            })
    }


    return (
        <div>
            <h3>Welcome New User!</h3>
            <h2>Create your account here</h2>

            <form onSubmit={handleSubmit}>
                <p>
                    <label>name </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleChange(e)}
                    />
                </p>
                <p>
                    <label>username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={(e) => handleChange(e)}
                    />
                </p>
                <p>
                    <label>password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => handleChange(e)}
                    />
                </p>
                <p>
                    <button type="submit">Sign Me Up</button>
                </p>
                <p>
                <h4>Already have an account? </h4>
                    <Link to='/'>Log In</Link>
                </p>
            </form>
        </div>
    );
}

export default SignupForm;
import { toBeChecked } from '@testing-library/jest-dom/dist/matchers'
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import './login.css'

export const Login = (props) => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const [data, getData] = useState([])
    useEffect(() => {
        axios.get("https://school-project-iota.vercel.app/api/users", {
            headers: {
                id: 4,
                token: "#@sp3gNR03@d"
            }
        })
        .then((response) => {
            const res = response.data
            getData(res)
        })
    },[])
    console.log(data)
    const handleSubmit = () => {
        if (username === data.data[0].firstname) {
            if (password === data.data[0].password) {
                sessionStorage.setItem('token', true)
            }
        }else{
            sessionStorage.setItem('token', false)
        }
        let token = sessionStorage.getItem('token')
        props.handleLogin(token) }
        //Updates the Username input field while typing the username
    const handleUsername = (e) => {
        setUsername(e.target.value)
    }
    //Updates the Password input field while typing the password
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    return (
        <div className="login-container">
            <h2>Sign In</h2>
            <div>
                <input placeholder="Username" value={username} onChange={handleUsername} type="text" autoComplete="username" />
                <input placeholder="Password" value={password} onChange={handlePassword} type="password" autoComplete="password" />
            </div>
            <div className="buttons-container">
            <button className="signup">Sign Up</button>
            <button className="submit" type="submit" value="Login" onClick={handleSubmit}>Login</button>
            </div>
        </div>
    )
}

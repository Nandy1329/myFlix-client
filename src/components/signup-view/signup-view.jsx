import React from 'react';
import { useState } from 'react';

export const SignupView = () => {  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const isoDate = new Date(birthday).toISOString();
    
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: isoDate,
        };

        fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            if(response.ok) {
                alert ("Signup Successful");
                window.location.reload();
            } else {
                alert("Signup failed, try again");
            }
        });
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <label htmlFor="username">
                Username:
                <input id="username" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required minLength="3" />
            </label>
            <label htmlFor="password">
                Password:
                <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <label htmlFor="email">
                Email:
                <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label htmlFor="birthday">
                Birthday:
                <input id="birthday" name="birthday" type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

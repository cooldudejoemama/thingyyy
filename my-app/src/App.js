import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './App.css';


function App() {
    const [email, setEmail] = useState('');
    const [topOffset, setTopOffset] = useState(0);
    const [bottomOffset, setBottomOffset] = useState(0);
    
    const handleSignUp = async () => {
        // Simple regex for email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
        if (!emailRegex.test(email)) {
            console.log('Please enter a valid email address.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/api/emails/collect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ address: email })
            });
    
            if (response.ok) {
                console.log('Successfully signed up!');
                setEmail('');  // Clear the email state
            } else {
                console.log("error");
            }
            
        } catch (error) {
            console.log('There was a problem with the signup process.');
        }
    }
    
    
    

    useEffect(() => {
        const interval = setInterval(() => {
            setTopOffset(oldOffset => oldOffset + 1);
            setBottomOffset(oldOffset => oldOffset - 1);  // Moves in the opposite direction
        }, 16);  // Updates roughly 60 times a second for smoother animation

        return () => clearInterval(interval);
    }, []);

    const generateWavePath = (offset) => {
        let path = "M-100,50 "; // Starts a bit outside to the left
        for(let i = -100; i < 1540; i++) { // Starts the loop from -100 and ends at 1540 to maintain the width
            path += `L${i},${50 + 25 * Math.sin((i + offset) * 0.02)} `;
        }
        return path;
    }
    

    return (
        <div className="container">
            <Helmet>
                <link 
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" 
                    rel="stylesheet"
                />
            </Helmet>

            <svg className="wave-top" viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
                <path d={generateWavePath(topOffset)} stroke="#FAEBD7" fill="none" strokeWidth="15"/>
            </svg>

            <h1 className='header'>Ahead of the Curve</h1>
            <p>Providing Value Through AI</p>
            
            <div className="sign-up-form">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleSignUp}>Sign Up</button>
            </div>
            <p>coming soon...</p>

            <svg className="wave-bottom" viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
                <path d={generateWavePath(bottomOffset)} stroke="#FAEBD7" fill="none" strokeWidth="15"/>
            </svg>
        </div>
    );
}

export default App;

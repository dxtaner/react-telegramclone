import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from '../firebase'
import "./Login.css"

function Login() {

    const signIn = () =>{
        auth.signInWithPopup(provider).catch((err) =>{
            alert(err.message)
        } ) 

    }

    return (
        <div className="login">
           <div className="loginContainer" >
                <img src="https://seeklogo.com/images/T/telegram-logo-52EACC2D94-seeklogo.com.png" 
                    alt="TelegramLogo"
                    width="150px"
                />
                <h2>Telegram</h2>
                <Button onClick={signIn} className="loginButton"> Sign In </Button>
            </div>
        </div>
    )
}

export default Login

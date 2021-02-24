import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from './features/appSlice'
import { auth,provider } from './firebase'
import './Login.css'

function Login() {

    const dispatch = useDispatch()
    const SignIn=()=>{
        auth.signInWithPopup(provider).then(result=>{
            dispatch(login({
                username:result.user.displayName,
                profilePic:result.user.photoURL,
                id:result.user.uid
            }))
        }).catch(error=> alert(error))
    }
    return (
        <div className="Login">
            <div className="Login__container">
                <img src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt=""/>
                <Button variant="outlined" onClick={SignIn}>Sign in</Button>
            </div>
        </div>
    )
}

export default Login

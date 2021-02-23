import { Avatar } from '@material-ui/core'
import React from 'react'
import './Chat.css'
import StopRounded from '@material-ui/icons/StopRounded'
import Reacttimeago from 'react-timeago'
import { useDispatch } from 'react-redux'
import { selectCameraImage } from './features/Cameraslice'
import { selectimage } from './features/appSlice'

function Chat({id,profilePic,username,timestamp,imageUrl,read}) {
    const dispatch = useDispatch()
    const Open=()=>{
        if (!read) {
            dispatch(selectimage(imageUrl))
        }
    }
    return (
        <div onClick={Open} className="chat">
            <Avatar className="chat__avatar" src={profilePic}/>
            <div className="chat_info">
                <h4>{username}</h4>
                <p>tap to view <Reacttimeago date={new Date(timestamp?.toDate()).toUTCString()}/></p>
            </div>
            {!read && <StopRounded className="chat_stopRounded"/>}
        </div>
    )
}

export default Chat

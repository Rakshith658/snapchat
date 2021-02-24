import { Avatar } from '@material-ui/core'
import React from 'react'
import './Chat.css'
import StopRounded from '@material-ui/icons/StopRounded'
import Reacttimeago from 'react-timeago'
import { useDispatch } from 'react-redux'
// import { selectCameraImage } from './features/Cameraslice'
import { selectImage } from './features/appSlice'
import { db } from './firebase'
import { useHistory } from 'react-router-dom'


function Chat({id,profilePic,username,timestamp,imageUrl,read}) {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const Open=()=>{
        if (!read) {
            dispatch(selectImage(imageUrl));
            db.collection('posts').doc(id).set({
                read:true
            },{
                merge:true
            })
            history.push('/chats/view')
        }
    }
    return (
        <div onClick={Open} className="chat">
            <Avatar className="chat__avatar" src={profilePic}/>
            <div className="chat_info">
                <h4>{username}</h4>
                <p>{ !read && "tap to view" }{" "}<Reacttimeago date={new Date(timestamp?.toDate()).toUTCString()}/></p>
            </div>
            {!read && <StopRounded className="chat_stopRounded"/>}
        </div>
    )
}

export default Chat

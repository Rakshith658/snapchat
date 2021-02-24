import { Avatar } from '@material-ui/core'
import React, { useEffect } from 'react'
import './Chats.css'
import SearchIcon from '@material-ui/icons/Search'
import ChatBubbaleIcon from '@material-ui/icons/ChatBubble'
import { useState } from 'react'
import { auth, db } from './firebase'
import Chat from './Chat'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from './features/appSlice'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { useHistory } from 'react-router-dom'
import { resetCameraImage } from './features/Cameraslice'

function Chats() {
    const [posts, setposts] = useState([]);
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const history=useHistory()

    useEffect(() => {
        db.collection('posts').orderBy('timestamp','desc').onSnapshot((snapshot)=>
            setposts(snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data()
            })))
        )
    }, [])


    const takesnap =()=>{
        dispatch(resetCameraImage())
        history.replace('/')
    }
    return (
        <div className="chats">
            <div className="chats_header">
                <Avatar src={user.profilePic} onClick={()=>auth.signOut()} className="chats_avatar"/>
                <div className="chats_search">
                    <SearchIcon className="chats_searchIcon"/>
                    <input type="text" placeholder="Friends"/>
                </div>
                <ChatBubbaleIcon className="chats_chatbubble"/>
            </div>
            <div className="chats_posts">
                {posts.map(({id,data:{profilePic,username,timestamp,imageUrl,read}})=>(
                    <Chat
                        key={id}
                        id={id}
                        profilePic={profilePic}
                        username={username}
                        timestamp={timestamp}
                        imageUrl={imageUrl}
                        read={read}
                    />
                ))}
            </div>
            <RadioButtonUncheckedIcon
                className="chats_TskepicIcon"
                onClick={takesnap}
                fontSize="large"
            />
        </div>
    )
}

export default Chats
